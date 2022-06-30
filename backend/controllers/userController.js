const UserCollection = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, phone, role } = req.body;

    //   const { role } = req.body.isAdmin? "admin" : "user";

    //hash the plain text password
    const hashPassword = bcrypt.hashSync(password, 6);

    //check if the email is not already in the database
    const checkEmail = await UserCollection.getUserByEmail(email);

    // email should be unique
    if (checkEmail) {
      res.json({ status: "error", error: "Email is already in use..." });
    }

    //check email type
    else if (!email || typeof email !== "string") {
      res.json({ status: "error", error: "Please enter a valid email" });
    }

    //check password type
    else if (!password || typeof password !== "string") {
      res.json({ status: "error", error: "Invalid password" });
    }

    //check password strength
    else if (password.length < 4) {
      res.json({
        status: "error",
        error: "Too weak password, Should be at least 4 characters",
      });
    } else {
      // create user
      const user = await UserCollection.createUser(
        firstname,
        lastname,
        email,
        hashPassword,
        phone,
        // address,
        role
        // profilePic
      );
      console.log("user", user);
      res.json({ status: "success", data: user });
    }
  } catch (err) {
    console.log("Error: ", err.message);
    res.json({ status: "error", error: err.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await UserCollection.getUserByEmail(email);

    if (user) {
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) return res.json({ status: `Wrong password` });

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          //   role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "2hr" }
      );

      console.log("Token-login: ", token);

      return res.json({
        status: `success`,
        message: `You're successfully signed in...`,
        token: token,
      });
    } else {
      return res.json({ status: "Invalid email or password" });
    }
  } catch (err) {
    console.log("Error: ", err.message);
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserCollection.getAll();
    res.json({ status: "success", data: users });
  } catch (err) {
    console.log("Error", err.message);
    res.json({ status: "error", error: err.message });
  }
};
