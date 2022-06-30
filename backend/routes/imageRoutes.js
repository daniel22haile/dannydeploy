const express = require("express");
const router = express.Router();
const verify = require("../middleware/auth");

const { createImage } = require("../controllers/imageController");

router.post("/images", createImage);


module.exports = router;
