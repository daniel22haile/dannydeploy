const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  firstname: { type: "string", required: true },
  lastname: { type: "string", required: true },
  email: {
    type: "string",
    required: true,
    match: [/.+\@.+\..+/, `Please fill valid email address`],
  },
  password: { type: "string", required: true },
  phone: { type: "string", required: true },
  // address: {
  //   street: { type: "string", required: true },
  //   city: { type: "string", required: true },
  //   state: { type: "string", required: true },
  //   zipcode: { type: "string", required: true },
  // },
  // profilePic: { type: String, default: "/images/profilePic.png" },
 role: { type: "string" }
});

const UserModel = mongoose.model("user", UserSchema);

class UserCollection {
  static async createUser(
    firstname,
    lastname,
    email,
    password,
    phone,
    // address,
    role,
    // profilePic
  ) {
    const user = new UserModel({
      firstname,
      lastname,
      email,
      password,
      phone,
      // address,
      role,
      // profilePic,
    });

    await user.save();
    return user;
  }

  static async getUserByEmail(email) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async getAll() {
    const user = await UserModel.find({});
    return user;
  }
}

module.exports = UserCollection;
