const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EquipmentUser = new Schema({
    equipment: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        required: true,
        default: new Date(),
    }
});

module.exports = mongoose.model('EquipmentUser', EquipmentUser);
