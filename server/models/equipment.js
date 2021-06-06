const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Equipment = new Schema({
    name : {type: String, required: true},
    inventoryCode: {type: String, required: true},
    description: {type: String, required: false},
    type: {
        type: Schema.Types.ObjectId,
        ref: "EquipmentType",
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

module.exports = mongoose.model('Equipment', Equipment);
