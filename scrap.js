


const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const ScrapDetails = require('../models/ScrapDetails');

// Route to send address and scrap data to database
router.post('/sendScrapData', fetchuser, async (req, res) => {
  try {
    const { address, scrapDetails, itemWeight, date, time, name, phone } = req.body;

    // Create a new ScrapDetails object with the user's ID from the auth middleware
    const newScrap = new ScrapDetails({
      user: req.user.id,
      name,
      phone,
      address,
      itemWeight,
      date,
      time,
      scrapDetails
    });

    // Save the new scrap object to the database
    const savedScrap = await newScrap.save();

    res.json(savedScrap);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


router.get('/showScrapData', fetchuser, async (req, res) => {
  try {
    const scrapData = await ScrapDetails.find({ user: req.user.id }).sort({createdAt: -1});

    res.json(scrapData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;


