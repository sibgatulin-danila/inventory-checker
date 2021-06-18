const express = require('express');
const router  = express.Router();
const equipments = require('../controllers/equipments')

const {isAdmin} = require('../passport/auth');

router.get('/create', isAdmin, function (req, res) {
    equipments.create(req, res);
});

router.post('/create', isAdmin, function (req, res) {
    equipments.createPost(req, res);
});

router.post('/update', isAdmin, function (req, res) {
    equipments.updatePost(req, res);
});

router.post('/search', function (req, res) {
    equipments.search(req, res);
});

router.get('/:id/moves', isAdmin, function (req, res) {
    equipments.moves(req, res);
});

router.post('/:id/moves', isAdmin, function (req, res) {
    equipments.movesPost(req, res);
});

router.get('/:id/repairs', isAdmin, function (req, res) {
    equipments.repairs(req, res);
});

router.post('/:id/repairs', isAdmin, function (req, res) {
    equipments.repairsPost(req, res);
});

router.get('/:id/repairs/:repairId', isAdmin, function (req, res) {
    equipments.repair(req, res);
});

router.get('/:id', function (req, res) {
    equipments.equipment(req, res);
});

router.get('/', function (req, res) {
    equipments.index(req, res);
});


module.exports = router;
