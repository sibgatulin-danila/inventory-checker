const express = require('express');
const router  = express.Router();
const act = require('../controllers/act')

router.get('/move/:id', function (req, res) {
    act.move(req, res);
});
router.get('/repair/:id', function (req, res) {
    act.repair(req, res);
});

module.exports = router;
