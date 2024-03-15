const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScrapSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    itemWeight: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    scrapDetails: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const ScrapDetails = mongoose.model('ScrapDetails', ScrapSchema);
module.exports = ScrapDetails;
