const express = require('express');
const router  = express.Router();
const equipments = require('../controllers/equipments')

router.get('/create', function (req, res) {
    equipments.create(req, res);
});

router.post('/create', function (req, res) {
    equipments.createPost(req, res);
});

router.post('/update', function (req, res) {
    equipments.updatePost(req, res);
});

router.get('/:id/moves', function (req, res) {
    equipments.moves(req, res);
});

router.post('/:id/moves', function (req, res) {
    equipments.movesPost(req, res);
});

router.get('/:id/repairs', function (req, res) {
    equipments.repairs(req, res);
});

router.post('/:id/repairs', function (req, res) {
    equipments.repairsPost(req, res);
});

router.get('/:id/repairs/:repairId', function (req, res) {
    equipments.repair(req, res);
});

router.get('/:id', function (req, res) {
    equipments.equipment(req, res);
});

router.get('/', function (req, res) {
    equipments.index(req, res);
});


module.exports = router;
