const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    try {
      const auth = req.headers.authorization;

      console.log("auth-header", auth);

      if (!auth) res.json({ status: "error", errMsg: "Invalid authorization" });

      const enc_token = auth.split(" ")[1];
      if (enc_token) {
        const token = jwt.verify(enc_token, process.env.JWT_SECRET);
        console.log("verify_token? - ", token);

        /** - OUT PUT
         * verify_token? -  {
            id: '629bca6dea2dbab226c06d3f',
            email: 'test5@gmail.com',
            iat: 1654479469
            }
         */

        req.token = token;
        next();
      } else {
        res.json({ error: 1 });
      }
    } catch (e) {
      console.log("error message", e.message);
      next(e);
    }
  },

  isAdmin: (req, res, next) => {
    if (req.token.role === "admin") {
      next();
    } else {
      res.json({ error: "Granted only for admin" });
    }
  },

  // isAdmin: (req, res, next) => {
  //   if (req.token.role === "admin") {
  //     next();
  //   } else {
  //     res.json({ error: "Granted only for admin" });
  //   }
  // },
};
