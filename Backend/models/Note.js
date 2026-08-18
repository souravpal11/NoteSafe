const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  titleIV: {
    type: String,
    required: true,
  },

  titleAuthTag: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  descriptionIV: {
    type: String,
    required: true,
  },

  descriptionAuthTag: {
    type: String,
    required: true,
  },

  tag: {
  type: String,
  required: true,
},

tagIV: {
  type: String,
  required: true,
},

tagAuthTag: {
  type: String,
  required: true,
},

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.note ||
  mongoose.model("note", NoteSchema);