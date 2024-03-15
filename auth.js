
const express = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");


const jwtSecret = "Rahul";



// User registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const savedUser = await user.save();

    // Generate JWT token
    const payload = {
      user: {
        id: savedUser.id
      }
    };
    jwt.sign(payload, jwtSecret, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});













// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(payload, jwtSecret, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});




// Get user data
router.get('/userdata', fetchuser, async (req, res) => {
  try {
    // Find user by ID and exclude password field
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});




















  


  module.exports = router;
