const Document = require("../models/documentModels");

const addDocument = async (req, res) => {
  try {
    const { agency, purposeOfLetter, date, name } = req.body;

    if (!agency || !purposeOfLetter || !date || !name) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const document = new Document({
      agency,
      purposeOfLetter,
      date,
      name,
    });

    await document.save();

    return res.status(201).json({
      message: "Feedback submitted successfully",
      document,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDocument = async (req, res) => {
  try {
    const document = await Document.find();
    res.json(document);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

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

module.exports = { addDocument, getDocument, deleteDocument };
