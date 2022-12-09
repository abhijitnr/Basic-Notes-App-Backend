const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    userId: String,
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
