const express = require('express');
const router  = express.Router();
const index = require('../controllers/index')

router.get('/', function (req, res) {
    res.redirect('/requests');
});

module.exports = router;
