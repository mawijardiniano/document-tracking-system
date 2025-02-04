const mongoose = require("mongoose");
const { type } = require("os");


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
  type : {
    type : String,
    enum : ["incoming", "outgoing"],
    required: true
  }
});

module.exports = mongoose.model("Document", documentSchema);
