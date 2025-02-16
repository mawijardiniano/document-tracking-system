const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  agency: {
    type: String,
    required: true,
  },
  purposeOfLetter: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["incoming", "outgoing"],
    required: true,
  },
  fileName: {
    type: String, 
    required: false,
  },
  fileData: {
    type: String, // Store file data as Base64 or URL
    required: false,
  },

});

module.exports = mongoose.model("Document", documentSchema);
