const express = require('express');
const router  = express.Router();
const employees = require('../controllers/employees')


router.get('/create', function (req, res) {
    employees.create(req, res);
});

router.post('/create', function (req, res) {
    employees.createPost(req, res);
});

router.get('/:id', function (req, res) {
    employees.employee(req, res);
});

router.get('/', function (req, res) {
    employees.index(req, res);
});

module.exports = router;
