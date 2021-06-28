const bcrypt = require('bcryptjs');

const User = require('../models/user');
const {isValidPassword} = require('../passport/is-valid-password');
const {generateToken} = require('../passport/token-util');

exports.loginGet = function (req, res) {
    res.cookie('authorization', '', {expires: new Date()});
    return res.render('login', {
        isAdmin            : req.query.adminlogin && req.query.adminlogin == '1',
        routeAuthCheck     : '/auth/login',
        routeAuthAdminLogin: '/auth/login?adminlogin=1'
    });
};

exports.loginPost = function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.isAdmin && req.body.isAdmin == '1'
        ? 'admin'
        : 'user';

    User.findOne({username, role}, (err, user) => {
        if (err) {
            throw err;
        }

        if (!user) {
            return res.redirect('/auth/login?incorrect_credentials=1' + (role === 'admin' ? '&adminlogin=1' : ''))
        }

        if (isValidPassword(user, password)) {
            let token = generateToken(user);
            res.cookie('authorization', token, {
                expires: new Date(Date.now() + ( 3600 * 1000 * 24)),
                httpOnly: true
            })
            return res.redirect('/');
        }

        return res.json({
            'code': 400,
            'message': 'Что-то не так'
        })
    });
}

exports.logoutGet = function (req, res, next) {
    res.redirect('/auth/login');
}

exports.seeds = function (req, res, next) {
    User.find({username: process.env.ADMIN_NAME, role: 'admin'}, function (err, docs) {
        if (err) {
            throw err;
        }
        bcrypt.hash(process.env.ADMIN_PASS, 10).then((encryptedPassword) => {
            let newAdmin = new User({
                firstname : 'admin',
                lastname  : 'admin',
                middlename: '',
                username  : process.env.ADMIN_NAME,
                password  : encryptedPassword,
                phone     : '70000000000',
                role      : 'admin',
            });

            newAdmin.save(function (err) {
                if (err) {
                    console.log(err);
                    if (err.code === 11000) {
                        return res.render('seeds');
                    }
                }
                return res.render('seeds');
            })
        });
    });
};
