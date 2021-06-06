const bcrypt = require('bcryptjs');

const {employeesUrls} = require('../config');

const User = require('../models/user');

exports.index = function (req, res) {
    res.render('equipments');
};

exports.create = function (req, res) {
    res.render('employees-create', {
        employeesCreateUrl: employeesUrls.employeesCreate
    });
};

exports.employee = function (req, res) {
    res.render('employees-employee');
};

exports.createPost = function (req, res) {
    let data = req.body;
    data.role = 'user';
    data.password = bcrypt.hashSync(data.password, 10);
    let newUser = new User(data);
    newUser.save(function (err) {
        if (err) {
            return res.json({
                'status': 'failed',
                'message': 'Что-то пошло не так!',
            })
        }
        return res.redirect('/employees')
    });
}
