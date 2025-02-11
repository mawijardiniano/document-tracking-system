const Document = require("../models/documentModels");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("document");


const addDocument = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading file" });
      }

      const { agency, purposeOfLetter, date, name, code, type } = req.body;

      if (!agency || !purposeOfLetter || !date || !code || !type) {
        return res.status(400).json({ message: "All fields are required." });
      }

      let fileData = null;
      let fileName = null;

      if (req.file) {
        fileName = req.file.originalname;
        fileData = req.file.buffer.toString("base64"); 
      }

      const document = new Document({
        agency,
        purposeOfLetter,
        date,
        name,
        code,
        type,
        fileName, 
        fileData,  
      });

      await document.save();

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


const updateDocument = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: "Error uploading file" });
      }

      const { agency, purposeOfLetter, date, name, code, type } = req.body;
      const fileName = req.file ? req.file.originalname : null;  
      const fileData = req.file ? req.file.buffer.toString("base64") : null; 
      if (!agency || !purposeOfLetter || !date || !code || !type) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const document = await Document.findById(req.params.id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Update the document fields
      document.agency = agency;
      document.purposeOfLetter = purposeOfLetter;
      document.date = date;
      document.name = name;
      document.code = code;
      document.type = type;

      // Update file details if a new file is uploaded
      if (fileName && fileData) {
        document.fileName = fileName;
        document.fileData = fileData;
      }

      // Save the updated document
      await document.save();

      // Return the updated document
      return res.status(200).json({
        message: "Document updated successfully",
        document,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addDocument, getDocument, deleteDocument, updateDocument };
