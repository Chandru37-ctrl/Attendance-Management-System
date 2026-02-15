const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  studentId: {
    type: String,
    required: true,
    unique: true
  },

  department: {
    type: String,
    required: true
  },

  year: {
    type: Number,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Student", studentSchema);
