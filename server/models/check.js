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
    },
    equipments: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Check', Check);
