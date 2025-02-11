const Name = require("../models/nameModel");


const addName = async (req, res) => {
  try {

      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: "All fields are required." });
      }


      const names = new Name({
        name
      });

      await names.save();

      return res.status(201).json({
        message: "Agency added successfully",
        names,
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


module.exports = { addName, getDocument, deleteDocument, updateDocument };
