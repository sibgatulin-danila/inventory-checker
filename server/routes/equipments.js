const express = require('express');
const router  = express.Router();
const equipments = require('../controllers/equipments')
const equipmentTypes = require('../controllers/equipment-types');

router.get('/types/create', function (req, res) {
    equipmentTypes.create(req, res);
});

router.post('/types/create', function (req, res) {
    equipmentTypes.createPost(req, res);
});

router.get('/types/', function (req, res) {
    equipmentTypes.index(req, res);
});

router.post('/types/update', function (req, res) {
    equipmentTypes.updatePost(req, res);
});

router.get('/types/:id', function (req, res) {
    equipmentTypes.equipmentType(req, res);
});

router.get('/', function (req, res) {
    equipments.index(req, res);
});

router.get('/create', function (req, res) {
    equipments.create(req, res);
});

router.post('/create', function (req, res) {
    equipments.createPost(req, res);
});

router.post('/update', function (req, res) {
    equipments.updatePost(req, res);
});

router.get('/:id', function (req, res) {
    equipments.equipment(req, res);
});


module.exports = router;
