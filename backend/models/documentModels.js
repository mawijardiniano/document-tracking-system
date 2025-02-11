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
  fileData: {
    type: String, // Store the Base64 string of the file
    required: false,
  }
});

module.exports = mongoose.model("Document", documentSchema);
