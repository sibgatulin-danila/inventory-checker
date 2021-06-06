const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const EquipmentType = new Schema({
    name : {type: String, required: true, unique: true},
});

module.exports = mongoose.model('EquipmentType', EquipmentType);
