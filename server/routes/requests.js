const express = require('express');
const router  = express.Router();
const requests = require('../controllers/requests')

const {isUser} = require('../passport/auth');

router.get('/', function (req, res) {
    requests.index(req, res);
});

router.get('/buy', isUser, function (req, res) {
    requests.buy(req, res);
});

router.post('/buy', isUser, function (req, res) {
    requests.buyPost(req, res);
});

router.get('/repair', isUser, function (req, res) {
    requests.repair(req, res);
});

router.post('/repair', isUser, function (req, res) {
    requests.repairPost(req, res);
});

router.get('/move', isUser, function (req, res) {
    requests.move(req, res);
});

router.post('/move', isUser, function (req, res) {
    requests.movePost(req, res);
});

router.get('/remove', isUser, function (req, res) {
    requests.remove(req, res);
});

router.post('/remove', isUser, function (req, res) {
    requests.removePost(req, res);
});

router.get('/:id', function (req, res) {
    requests.request(req, res);
});

module.exports = router;
