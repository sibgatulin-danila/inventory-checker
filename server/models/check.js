const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Check = new Schema({
    createdAt: {
        type: Date,
        default: new Date(),
    },
    equipmentsCount: {
        type: Number,
        default: 0,
    }
});

module.exports = mongoose.model('Check', Check);
