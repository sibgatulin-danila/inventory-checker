const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

//TODO: token expiration date
const UserToken = new Schema({
    userId : {type: String, required: true},
    token: {type: String, required: false},
});

module.exports = mongoose.model('UserToken', UserToken);
