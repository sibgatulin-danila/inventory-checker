const express = require('express');
const router  = express.Router();
const index = require('../controllers/index')

router.get('/', function (req, res) {
    index.home(req, res);
});

module.exports = router;
