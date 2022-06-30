const express = require('express');
const router = express.Router();
const verify = require('../middleware/auth');

const {
  userRegister,
  login,
  getAllUsers,
} = require("../controllers/userController");

router.post('/register', userRegister);
router.post("/login", login);
router.get("/",verify.auth,verify.isAdmin,  getAllUsers);

module.exports = router;