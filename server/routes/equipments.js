const express = require('express');
const router  = express.Router();
const passport = require('passport');
const equipments = require('../controllers/equipments')

router.get('/', function (req, res) {
    equipments.index(req, res);
});

router.get('/create', function (req, res) {
    equipments.create(req, res);
});

router.get('/1', function (req, res) {
    equipments.equipment(req, res);
});

module.exports = router;
