const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  subjectCode: {
    type: String,
    required: true,
    unique: true
  },

  department: {
    type: String,
    required: true
  },

  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Subject", subjectSchema);
