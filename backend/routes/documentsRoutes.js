const express = require("express");
const router = express.Router();
const { addDocument, getDocument, deleteDocument } = require("../controllers/documentsControllers");

router.post("/add-document", addDocument);
router.get("/get-document", getDocument);
router.delete("/delete-document/:id", deleteDocument);

module.exports = router;
