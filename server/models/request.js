const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Request = new Schema({
    type : {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, default: 'pending'},
    equipment: {
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: new Date(),
    }
});

module.exports = mongoose.model('Request', Request);
