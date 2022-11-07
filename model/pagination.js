const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
    userName: {
        type: String,
        required:true,
    },
    profileUrl: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },

})


module.exports = mongoose.model('Page',pageSchema)