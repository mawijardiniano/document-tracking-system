const Document = require("../models/documentModels");
const multer = require("multer");
const { uploadFile } = require("./googleDrive");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * Add a new document
 */
const addDocument = async (req, res) => {
  try {
    const { agency, purposeOfLetter, date, name, code, type } = req.body;

    if (!agency || !purposeOfLetter || !date || !code || !type) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let fileUrl = null;
    let fileName = null;

    if (req.file) {
      fileName = req.file.originalname;

      // Upload file buffer to Google Drive
      const uploadResult = await uploadFile(req.file.buffer, fileName);
      if (!uploadResult) {
        return res.status(500).json({ message: "File upload to Google Drive failed!" });
      }

      fileUrl = uploadResult.fileUrl;
    }

    // Save document with the Google Drive file URL
    const document = new Document({
      agency,
      purposeOfLetter,
      date,
      name,
      code,
      type,
      fileName,
      fileData: fileUrl, // Save Google Drive URL
    });

    await document.save();

    return res.status(201).json({
      message: "Document added successfully",
      document,
    });
  } catch (error) {
    console.error("Add Document Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Get all documents
 */
const getDocument = async (req, res) => {
  try {
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    console.error("Get Documents Error:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Delete document
 */
const deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Document ID is required" });
    }

    const deletedDocument = await Document.findByIdAndDelete(id);

    if (!deletedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({ message: "Document deleted successfully", deletedDocument });
  } catch (error) {
    console.error("Delete Document Error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

/**
 * Update document
 */
const updateDocument = async (req, res) => {
  try {
    const { agency, purposeOfLetter, date, name, code, type } = req.body;

    if (!agency || !purposeOfLetter || !date || !code || !type) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    document.agency = agency;
    document.purposeOfLetter = purposeOfLetter;
    document.date = date;
    document.name = name;
    document.code = code;
    document.type = type;

    if (req.file) {
      document.fileName = req.file.originalname || document.fileName;

      // Upload the new file to Google Drive
      const uploadResult = await uploadFile(req.file.buffer, document.fileName);
      if (!uploadResult) {
        return res.status(500).json({ message: "File upload failed!" });
      }
      document.fileData = uploadResult.fileUrl;
    }

    await document.save();

    return res.status(200).json({
      message: "Document updated successfully",
      document,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = { addDocument, getDocument, deleteDocument, updateDocument, upload };
