const express = require("express");
const Note = require("../models/Note");

const noteRoute = express.Router();

/* CREATE NOTES */
noteRoute.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const user = new Note(payload);
    await user.save();
    res.send({
      message: "Note successfully created.",
    });
  } catch (error) {
    res.send(error);
  }
});

/* READ NOTES */
noteRoute.get("/", async (req, res) => {
  try {
    const user = await Note.find();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

/* UPDATE NOTE */
noteRoute.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const userId = req.body.userId;
  const userIdInNote = await Note.findOne({ _id: id });

  if (userId !== userIdInNote.userId) {
    res.send("Not Authorized !");
  }

  try {
    await Note.findByIdAndUpdate({ _id: id }, payload);
    res.send({
      message: "Note updated successfully",
    });
  } catch (error) {
    res.send(error);
  }
});

/* DELETE NOTE */
noteRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;
  const userIdInNote = await Note.findOne({ _id: id });

  if (userId !== userIdInNote.userId) {
    res.send("Not Authorized !");
  }

  try {
    await Note.findByIdAndDelete({ _id: id });
    res.send("Note is successfully deleted");
  } catch (error) {
    res.send(error);
  }
});

module.exports = noteRoute;
