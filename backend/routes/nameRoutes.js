const express = require("express");
const router = express.Router();
const { addName } = require("../controllers/nameControllers");


router.post("/add-name", addName);

module.exports = router;
