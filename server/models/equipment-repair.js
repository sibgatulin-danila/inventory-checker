const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EquipmentRepair = new Schema({
    equipment: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    isSuccess: {
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model('EquipmentRepair', EquipmentRepair);
