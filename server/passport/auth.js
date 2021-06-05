const {verifyToken} = require('./token-util');

const User = require('../models/user');

module.exports.authCheck = function (req, res, next) {
    if (typeof req.cookies.authorization === 'undefined') {
        return res.redirect('/auth/login');
    }

    let decodedToken = verifyToken(req.cookies.authorization);

    let userId = decodedToken.id;
    if (!userId) {
        return res.redirect('/auth/login');
    }

    User.findOne({_id: userId}, function (err, user) {
        if (user) {
            next();
        } else if (err) {
            return res.redirect('/auth/login');
        }
    });
}