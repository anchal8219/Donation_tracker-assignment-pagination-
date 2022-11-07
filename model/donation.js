const mongoose = require('mongoose');
const donationSchema = new mongoose.Schema({
    from_creator:{
        type: String,
        required: true,
    },
    to_creator:{
        type: String,
        required: true,
    },

    currency: {
        type: Number,
        required:true,
    },
    amount: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Message: {
        type: String,
        required: true,
    },

})


module.exports = mongoose.model('Donation',donationSchema);