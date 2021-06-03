const express = require('express');
const router  = express.Router();
const passport = require('passport');
const requests = require('../controllers/requests')

router.get('/', function (req, res) {
    requests.index(req, res);
});

router.get('/create', function (req, res) {
    requests.create(req, res);
});

router.get('/1', function (req, res) {
    requests.request(req, res);
});

module.exports = router;
