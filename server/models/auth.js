const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Auth = new Schema({
    userHash : {type: String, required: true},
    token: {type: String, required: true},
    expirationTime: {type: String, required: true},
});

module.exports = mongoose.model('Auth', Auth);
