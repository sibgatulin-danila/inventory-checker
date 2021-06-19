const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Equipment = new Schema({
    name : {
        type: String,
        required: true
    },
    inventoryCode: {
        type: String,
        unique: true,
        required: true
    },
    serialNumber: {
        type: String,
        unique: true,
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
    deletedAt: {
        type: Date,
        default: null,
    }
});

Equipment.virtual('equipmentUser', {
    ref: 'EquipmentUser',
    localField: '_id',
    foreignField: 'equipment',
    justOne: true,
})

module.exports = mongoose.model('Equipment', Equipment);
