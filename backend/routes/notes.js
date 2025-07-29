const express = require("express");
const Notes = require("../models/Notes"); // importing the Notes model
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchUserDetails = require("../middleware/fetchUserDetails");

// Route 1: adding a new note using POST method, URL "/api/notes/addnote" with validation
router.post(
  "/addnote",
  fetchUserDetails,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    body(
      "description",
      "Description must be at least 5 characters long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    // checking if the request passed all validation rules
    const errors = validationResult(req);

    // if validation failed, return 400 Bad Request with the error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user_id = req.user.id;
    const { title, description, tag } = req.body;

    try {
      const new_note = await Notes.create({
        user: user_id,
        title,
        description,
        tag: tag || "General"
      });

      res.json(new_note);
    } catch (err) {
      // logging other errors to console and returning 500 Internal Server Error
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Route 2: fetching notes of logged in user using GET method, URL "/api/notes/getnote"
router.get(
  "/getnote",
  fetchUserDetails,
  async (req, res) => {

    const user_id = req.user.id;    

    try {
      const notes = await Notes.find({user: user_id});
      res.json(notes);
    } catch (err) {
      // logging other errors to console and returning 500 Internal Server Error
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
