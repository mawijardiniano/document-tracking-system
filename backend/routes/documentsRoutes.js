const express = require("express");
const router = express.Router();
const { addDocument, getDocument, deleteDocument, updateDocument } = require("../controllers/documentsControllers");

router.post("/add-document", addDocument);
router.get("/get-document", getDocument);
router.delete("/delete-document/:id", deleteDocument);
router.put("/update-document/:id", updateDocument);

module.exports = router;
