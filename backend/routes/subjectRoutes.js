const express = require("express");
const router = express.Router();

const Subject = require("../models/Subject");


// CREATE SUBJECT
router.post("/", async (req, res) => {

  try {

    const subject = new Subject(req.body);

    await subject.save();

    res.json(subject);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


// GET ALL SUBJECTS with teacher info
router.get("/", async (req, res) => {

  try {

    const subjects = await Subject.find()
      .populate("teacher");

    res.json(subjects);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});


// DELETE SUBJECT
router.delete("/:id", async (req, res) => {

  try {

    await Subject.findByIdAndDelete(req.params.id);

    res.json({ message: "Subject deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

module.exports = router;
