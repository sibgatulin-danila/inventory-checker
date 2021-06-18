const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EquipmentCheck = new Schema({
    equipment: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true,
    },
    check: {
        type: Schema.Types.ObjectId,
        ref: 'Check',
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model('EquipmentCheck', EquipmentCheck);
