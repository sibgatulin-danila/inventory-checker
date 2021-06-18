const {verifyToken} = require('./token-util');

const User = require('../models/user');

module.exports.authCheck = function (req, res, next) {
    if (typeof req.cookies.authorization === 'undefined') {
        return res.redirect('/auth/login');
    }

    try {
        let decodedToken = verifyToken(req.cookies.authorization);
        let userId = decodedToken.id;
        if (!userId) {
            return res.redirect('/auth/login');
        }

        User.findOne({_id: userId}, function (err, user) {
            if (user) {
                req.user = user
                next();
            } else if (err) {
                return res.redirect('/auth/login');
            }
        });
    } catch (err) {
        return res.redirect('/auth/login');
    }
}

module.exports.isAdmin = function (req, res, next) {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    if (req.user.role === 'admin') {
        next();
    } else {
        return res.redirect('/requests');
    }
}

module.exports.isUser = function (req, res, next) {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    if (req.user.role === 'user') {
        next();
    } else {
        return res.redirect('/requests');
    }
}
