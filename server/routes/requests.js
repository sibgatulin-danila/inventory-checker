const express = require('express');
const router  = express.Router();
const requests = require('../controllers/requests')

router.get('/', function (req, res) {
    requests.index(req, res);
});

router.get('/buy', function (req, res) {
    requests.buy(req, res);
});

router.post('/buy', function (req, res) {
    requests.buyPost(req, res);
});

router.get('/repair', function (req, res) {
    requests.repair(req, res);
});

router.post('/repair', function (req, res) {
    requests.repairPost(req, res);
});

router.get('/move', function (req, res) {
    requests.move(req, res);
});

router.post('/move', function (req, res) {
    requests.movePost(req, res);
});

router.get('/remove', function (req, res) {
    requests.remove(req, res);
});

router.post('/remove', function (req, res) {
    requests.removePost(req, res);
});

router.get('/create', function (req, res) {
    requests.create(req, res);
});

router.get('/:id', function (req, res) {
    requests.request(req, res);
});

module.exports = router;
