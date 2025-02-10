const Document = require("../models/documentModels");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("document");

// Middleware function to handle file upload and save document in DB
const addDocument = async (req, res) => {
  try {
    // Handle the file upload using multer
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading file" });
      }

      const { agency, purposeOfLetter, date, name, code, type } = req.body;

      // Validate required fields
      if (!agency || !purposeOfLetter || !date || !code || !type) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // If file is provided, convert it to base64
      let fileData = null;
      if (req.file) {
        fileData = req.file.buffer.toString("base64");
      }

      // Create a new document object
      const document = new Document({
        agency,
        purposeOfLetter,
        date,
        code,
        name,
        type,
        fileData, // Store the base64 string of the file
      });

      // Save the document to the database
      await document.save();

      // Send success response
      return res.status(201).json({
        message: "Document added successfully",
        document,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// ✅ Get all documents
const getDocument = async (req, res) => {
  try {
    const document = await Document.find();
    res.json(document);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Delete a document by ID
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Edit (Update) a document by ID
const updateDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    if (!id) {
      return res.status(400).json({ message: "Document ID is required" });
    }

    const updatedDocument = await Document.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({ message: "Document updated successfully", updatedDocument });
  } catch (error) {
    console.error("Update Document Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addDocument, getDocument, deleteDocument, updateDocument };
