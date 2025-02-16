const express = require("express");
const { addDocument, getDocument, deleteDocument, updateDocument, upload } = require("../controllers/documentsControllers");

const router = express.Router();

router.post("/add-document", upload.single("document"), addDocument);
router.get("/get-document", getDocument);
router.delete("/delete-document/:id", deleteDocument);
router.put("/update-document/:id", upload.single("document"), updateDocument);

module.exports = router;
