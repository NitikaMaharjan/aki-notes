const express = require("express");
const Notes = require("../models/Notes"); // importing the Notes model
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchUserDetails = require("../middleware/fetchUserDetails");

// Route 1: fetching notes of logged in user using GET method, URL "/api/notes/getnote"
router.get("/getnote", fetchUserDetails, async (req, res) => {
  const user_id = req.user.id;

  try {
    const notes = await Notes.find({ user: user_id }).sort({ date: -1 });
    res.json(notes);
  } catch (err) {
    // logging other errors to console and returning 500 Internal Server Error
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route 2: adding a new note using POST method, URL "/api/notes/addnote" with validation
router.post("/addnote", fetchUserDetails, async (req, res) => {
  
    const user_id = req.user.id;
    const { title, description, tag } = req.body;

    try {
      const new_note = await Notes.create({
        user: user_id,
        title,
        description,
        tag
      });

      res.json(new_note);
    } catch (err) {
      // logging other errors to console and returning 500 Internal Server Error
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Route 3: updating notes of logged in user using PUT method, URL "/api/notes/updatenote"
router.put("/updatenote/:id", fetchUserDetails, async (req, res) => {
  // to update the notes of logged in user, we need to get the notes id the user is trying to update, we also need to check if that notes belong to that user and then update the note with new stuff

  const user_id = req.user.id;
  const { title, description, tag } = req.body;

  try {
    // creating a new note object
    const new_note = {};
    if (title) {
      new_note.title = title;
    }
    if (description) {
      new_note.description = description;
    }
    if (tag) {
      new_note.tag = tag;
    }

    const note_edited_date = new Date();
    new_note.date = note_edited_date.toISOString();

    // finding the note to be updated using notes id
    let note_exist = await Notes.findById(req.params.id);

    if (!note_exist) {
      return res.status(404).send("Note not found");
    }

    // checking if that note belongs to the right user
    if (note_exist.user.toString() !== user_id) {
      return res.status(401).send("You are not allowed to make changes to the note");
    }

    let updated_note = await Notes.findByIdAndUpdate(req.params.id, { $set: new_note }, { new: true });
    res.json({ updated_note });
  } catch (err) {
    // logging other errors to console and returning 500 Internal Server Error
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route 4: deleting notes of logged in user using DELETE method, URL "/api/notes/deletenote"
router.delete("/deletenote/:id", fetchUserDetails, async (req, res) => {
  // to delete the notes of logged in user, we need to get the notes id the user is trying to delete, we also need to check if that notes belong to that user and then delete the note

  const user_id = req.user.id;

  try {
    // finding the note to be deleted using notes id
    let note_exist = await Notes.findById(req.params.id);

    if (!note_exist) {
      return res.status(404).send("Note not found");
    }

    // checking if that note belongs to the right user
    if (note_exist.user.toString() !== user_id) {
      return res.status(401).send("You are not allowed to make changes to the note");
    }

    let deleted_note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Note successfully deleted", deleted_note: deleted_note });
  } catch (err) {
    // logging other errors to console and returning 500 Internal Server Error
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
