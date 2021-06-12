const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Equipment = new Schema({
    name : {
        type: String,
        required: true
    },
    inventoryCode: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,
    },
    subtype: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports = mongoose.model('Equipment', Equipment);
