const bcrypt = require('bcryptjs');
const passport = require('passport');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/user');

exports.loginGet = function (req, res, next) {
    res.render('login', {
        isAdmin: req.query.adminlogin && req.query.adminlogin == '1',
        routeAuthCheck: '/auth/check',
        routeAuthAdminLogin: '/auth/login?adminlogin=1'
    });
};

exports.loginPost = function (req, res, next)  {
    const username = req.body.username;
    const password = req.body.password;

    const role = req.query.adminlogin && req.query.adminlogin == '1'
        ? 'admin'
        : 'user';

    User.findOne({username, role}, (err, user) => {
       if (err) {
           throw err;
       }
       if (!user) {
           return res.redirect('/auth/login?adminlogin=1&incorrect_credentials=1')
       }
       bcrypt.compare(password, user.password, (err, isEqual) => {
           if (err) {
               throw err;
           }
           if (!isEqual) {
               return res.redirect('/auth/login?adminlogin=1&incorrect_credentials=1')
           }
           const token = jsonwebtoken.sign(user, process.env.SECRET_KEY, {
               expiresIn: 3600 * 24,
           });

           res.cookie('token', 'JWT ' + token, {maxAge: 900000, httpOnly: true});
           next();
       })
    });
    passport.authenticate('local',
        function (err, user, info) {
            return err
                ? next(err)
                : user
                    ? req.logIn(user, function (err) {
                        return err
                            ? next(err)
                            : res.redirect('/');
                    })
                    : res.redirect('/')
        }
    )(req, res, next);
}

exports.registerGet = function (req, res, next) {

}

exports.registerPost = function (req, res, next) {

}

exports.logoutGet = function (req, res, next) {
    req.logout();
    res.redirect('/');
}

exports.seeds = function (req, res, next) {
    User.find({username: process.env.ADMIN_NAME, role: 'amin'}, function (err, docs) {
        if (err) {
            throw err;
        }
        bcrypt.hash(process.env.ADMIN_PASS, 10).then((encryptedPassword) => {
            let newAdmin = new Admin({
                firstname: 'admin',
                lastname: 'admin',
                middlename: '',
                username: process.env.ADMIN_NAME,
                password: encryptedPassword,
                phone: '70000000000',
                role: 'admin',
            });

            newAdmin.save(function (err) {
                if (err) {
                    console.log(err);
                    if (err.code === 11000) {
                        res.render('seeds');
                    }
                }
                res.render('seeds');
            })
        });
    });
};
