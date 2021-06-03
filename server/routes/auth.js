const express = require('express');
const router  = express.Router();

const auth = require('../controllers/auth')

router.get('/login', function (req, res, next) {
    auth.loginGet(req, res, next);
});

router.post('/login', function (req, res, next) {
    auth.loginPost(req, res, next);
});

router.get('/register', function (req, res, next) {
    auth.registerGet(req, res, next);
});

router.post('/register', function (req, res, next) {
    auth.registerPost(req, res, next);
});

router.get('/logout', function (req, res, next) {
    auth.logoutGet(req, res, next);
});

router.get('/seeds', function (req, res, next) {
    auth.seeds(req, res, next);
});

router.post('/check', function (req, res, next) {
    auth.check(req, res, next);
});

module.exports = router;
