const express = require("express")
const router = express.Router()

const donationController = require('../controllers/donationController');

const { author } = require('../middlewares/authorization');


router.post('/donDetail', author, donationController.getDonatordetails) 

module.exports = router;