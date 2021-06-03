const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const User = new Schema({
    firstname : {type: String, required: false},
    middlename: {type: String, required: false},
    lastname  : {type: String, required: false},
    username  : {type: String, required: true, unique: true},
    phone     : {type: String, required: true},
    password  : {type: String, required: true},
    role      : {type: String, required: true}
});

module.exports = mongoose.model('User', User);
