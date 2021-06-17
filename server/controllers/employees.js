const bcrypt = require('bcryptjs');

const {employeesUrls} = require('../config');

const User = require('../models/user');

exports.index = async function (req, res) {
    let users = await User.find({role: 'user'});
    res.render('employees', {users});
};

exports.create = function (req, res) {
    res.render('employees-create', {
        employeesCreateUrl: employeesUrls.employeesCreate
    });
};

exports.employee = async function (req, res) {
    let user = await User.findOne({_id: req.params.id});
    res.render('employees-employee', {user});
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

exports.updatePost = async function (req, res) {
    let data = req.body;

    if (!data.password) {
        delete data.password;
    } else {
        data.password = bcrypt.hashSync(data.password, 10);
    }

    let employee = await User.findOne({_id: data._id});

    Object.keys(data).forEach(key => {
        employee[key] = data[key];
    });

    employee.save(err => {
        if (err) {
            return res.json({
                'status': 'failed',
                'message': 'Что-то пошло не так!',
            })
        }

        return res.redirect('/employees')
    });

}
