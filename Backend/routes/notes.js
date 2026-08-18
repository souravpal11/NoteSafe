const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { encrypt, decrypt } = require("../utils/crypto");
const { body, validationResult } = require("express-validator");

//ROUTE-1: Get all the notes using: GET "/api/auth/getuser" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user.id,
    });

    const decryptedNotes = notes.map((note) => {
      return {
        _id: note._id,

        title: decrypt(note.title, note.titleIV, note.titleAuthTag),

        description: decrypt(
          note.description,
          note.descriptionIV,
          note.descriptionAuthTag,
        ),

        tag: decrypt(note.tag, note.tagIV, note.tagAuthTag),

        date: note.date,
      };
    });

    res.json(decryptedNotes);
  } catch (error) {
    console.error("DECRYPT ERROR:", error);
    res.status(500).send("Unable to decrypt notes");
  }
});

//ROUTE-2: Add a new Note using: POST "/api/auth/addnote" login required

router.post("/addnote", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const encryptedTitle = encrypt(title);
    const encryptedDescription = encrypt(description);
    const encryptedTag = encrypt(tag);

    const note = await Note.create({
      title: encryptedTitle.encryptedData,
      titleIV: encryptedTitle.iv,
      titleAuthTag: encryptedTitle.authTag,

      description: encryptedDescription.encryptedData,
      descriptionIV: encryptedDescription.iv,
      descriptionAuthTag: encryptedDescription.authTag,

      tag: encryptedTag.encryptedData,
      tagIV: encryptedTag.iv,
      tagAuthTag: encryptedTag.authTag,

      user: req.user.id,
    });

    // Decrypt only before sending to React
    const decryptedNote = {
      _id: note._id,

      title: decrypt(note.title, note.titleIV, note.titleAuthTag),

      description: decrypt(
        note.description,
        note.descriptionIV,
        note.descriptionAuthTag,
      ),

      tag: decrypt(note.tag, note.tagIV, note.tagAuthTag),
      date: note.date,
    };

    res.json(decryptedNote);
  } catch (error) {
    console.error("Add note error:", error);
    res.status(500).send("Internal Server Error");
  }
});
// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    const newNote = {};

    if (title) {
      const encryptedTitle = encrypt(title);

      newNote.title = encryptedTitle.encryptedData;
      newNote.titleIV = encryptedTitle.iv;
      newNote.titleAuthTag = encryptedTitle.authTag;
    }

    if (description) {
      const encryptedDescription = encrypt(description);

      newNote.description = encryptedDescription.encryptedData;
      newNote.descriptionIV = encryptedDescription.iv;
      newNote.descriptionAuthTag = encryptedDescription.authTag;
    }

    if (tag) {
      const encryptedTag = encrypt(tag);

      newNote.tag = encryptedTag.encryptedData;
      newNote.tagIV = encryptedTag.iv;
      newNote.tagAuthTag = encryptedTag.authTag;
    }

    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true },
    );

    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
