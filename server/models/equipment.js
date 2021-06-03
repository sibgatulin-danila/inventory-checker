const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Auth = new Schema({
    type : {type: String, required: true},
    userId: {type: String, required: true},
    description: {type: String, required: true},
    equipmentId: {type: ObjectId, required: false}
});

module.exports = mongoose.model('Auth', Auth);
