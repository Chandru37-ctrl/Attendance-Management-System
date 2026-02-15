const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");


// MARK ATTENDANCE
router.post("/", async (req, res) => {

  try {

    const attendance = new Attendance(req.body);

    await attendance.save();

    res.json(attendance);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


// GET ALL ATTENDANCE
router.get("/", async (req, res) => {

  try {

    const attendance = await Attendance.find()
      .populate("student")
      .populate("subject")
      .populate("teacher");

    res.json(attendance);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


// GET ATTENDANCE BY STUDENT
router.get("/student/:id", async (req, res) => {

  try {

    const attendance = await Attendance.find({
      student: req.params.id
    }).populate("subject");

    res.json(attendance);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


// DELETE ATTENDANCE
router.delete("/:id", async (req, res) => {

  try {

    await Attendance.findByIdAndDelete(req.params.id);

    res.json({ message: "Attendance deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;
