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
    // Use a Promise wrapper for `upload()` to properly handle async/await
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          reject(res.status(400).json({ message: "Error uploading file" }));
        } else {
          resolve();
        }
      });
    });

    const { agency, purposeOfLetter, date, name, code, type } = req.body;

    if (!agency || !purposeOfLetter || !date || !code || !type) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Update document fields
    document.agency = agency;
    document.purposeOfLetter = purposeOfLetter;
    document.date = date;
    document.name = name;
    document.code = code;
    document.type = type;


    if (req.file) {
      document.fileName = req.file.originalname || document.fileName; 
      document.fileData = req.file.buffer.toString("base64");
    }


    if (!document.fileName) {
      return res.status(400).json({ message: "File name is required." });
    }

    await document.save();

    return res.status(200).json({
      message: "Document updated successfully",
      document,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { addDocument, getDocument, deleteDocument, updateDocument };
