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
    required: true,
  },
});

module.exports = mongoose.model("Document", documentSchema);
