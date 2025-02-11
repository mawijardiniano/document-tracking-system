const express = require("express");
const router = express.Router();
const { addAgency } = require("../controllers/agencyControllers");


router.post("/add-agency", addAgency);

module.exports = router;
