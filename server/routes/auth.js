const express = require('express');
const router  = express.Router();

const auth = require('../controllers/auth')

router.get('/login', function (req, res, next) {
    auth.loginGet(req, res, next);
});

router.post('/login', function (req, res, next) {
    auth.loginPost(req, res, next);
});

module.exports = router;
