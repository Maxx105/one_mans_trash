const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String
    },
    photo: {
        type: String
    },
    value: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        default: 'For Parts',
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    // user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    user: {
        type: String,
        required: true
    },
    userID: {
        type: String
    }
});

module.exports = mongoose.model('Item', ItemSchema);