const express = require('express');
const router  = express.Router();
const passport = require('passport');
const employees = require('../controllers/employees')

router.get('/', function (req, res) {
    employees.index(req, res);
});

router.get('/create', function (req, res) {
    employees.create(req, res);
});

router.get('/1', function (req, res) {
    employees.employee(req, res);
});

module.exports = router;
