const express = require("express");
const router = express.Router();

const Student = require("../models/Student");


// CREATE STUDENT
router.post("/", async (req, res) => {

  try {

    const student = new Student(req.body);

    await student.save();

    res.json(student);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


// GET ALL STUDENTS
router.get("/", async (req, res) => {

  try {

    const students = await Student.find();

    res.json(students);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


// DELETE STUDENT
router.delete("/:id", async (req, res) => {

  try {

    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: "Student deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;
