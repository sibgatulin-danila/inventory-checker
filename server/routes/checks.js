const express = require('express');
const router  = express.Router();

const checks = require('../controllers/checks')

router.get('/', function (req, res, next) {
    checks.index(req, res);
});

router.get('/create', function (req, res, next) {
    checks.create(req, res);
});

router.get('/:id', function (req, res, next) {
    checks.check(req, res);
});

router.get('/:id/delete', function (req, res, next) {
    checks.delete(req, res);
});

router.get('/:id/add', function (req, res, next) {
    checks.add(req, res);
});

router.post('/:id/add', function (req, res, next) {
    checks.addPost(req, res);
});

module.exports = router;
