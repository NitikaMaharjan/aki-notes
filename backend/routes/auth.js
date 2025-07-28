const express = require('express'); // importing express.js to use its router feature
const User = require('../models/User'); // importing the User model
const router = express.Router(); // creating a router object from express to define routes

// importing validation utilities from express-validator
// body is used to validate individual fields in the request
// validationResult is used to check the result of those validations
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const jwt_secret = "aginomoto$2025";

// sign up using POST method, URL "/api/auth/signup" with validation
router.post('/signup', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
  // checking if the request passed all validation rules
  const errors = validationResult(req);

   // if validation failed, return 400 Bad Request with the error messages
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // checking if a user with same email already exists
    const user_exists = await User.findOne({email: req.body.email});

    if (user_exists){// if user exists then no new user is created
      return res.status(400).json({ error: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // if validation passed and user does not exists already then create a new user with the request data
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }); 

    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, jwt_secret);

    // responding with authentication token (in JSON format)
    res.json({authtoken})

  } catch (err) {
    // logging other errors to console and returning 500 Internal Server Error
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// log in using POST method, URL "/api/auth/login" with validation
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must not be empty').exists()
], async (req, res) => {
  // checking if the request passed all validation rules
  const errors = validationResult(req);

   // if validation failed, return 400 Bad Request with the error messages
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  
  try {

    // checking if the user exists
    const user_exists = await User.findOne({email});

    if (!user_exists){
      return res.status(400).json({ error: 'Enter valid credentials' });
    }

    // checking is the password is correct
    const password_matched = await bcrypt.compare(password, user_exists.password);

    if (!password_matched){
      return res.status(400).json({ error: 'Enter valid credentials' });
    }

    const data = {
      user:{
        id: user_exists.id
      }
    }
    const authtoken = jwt.sign(data, jwt_secret);

    // responding with authentication token (in JSON format)
    res.json({authtoken})

  } catch (err) {
    // logging other errors to console and returning 500 Internal Server Error
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//exporting router so it can be used in index.js
module.exports = router;