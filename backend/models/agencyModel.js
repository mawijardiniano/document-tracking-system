const mongoose = require("mongoose");


const agencySchema = new mongoose.Schema({
  agencyName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Agency", agencySchema);
