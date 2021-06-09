const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Request = new Schema({
    type : {type: String, required: true},
    description: {type: String, required: true},
    equipment: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

module.exports = mongoose.model('Request', Request);
