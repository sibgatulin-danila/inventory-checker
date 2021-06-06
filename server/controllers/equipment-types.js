const EquipmentType = require('../models/equipment-type');
const {equipmentTypesUrls} = require('../config');

exports.index = function (req, res) {
    res.render('equipment-types');
};

exports.create = function (req, res) {
    return res.render('equipment-types-create', {
        equipmentTypesCreateUrl: equipmentTypesUrls.equipmentTypesCreate
    });
};

exports.createPost = function (req, res) {
    let data = req.body;
    let newEquipmentType = new EquipmentType(data);

    newEquipmentType.save(function (err) {
        if (err) {
            return res.json({
                'code': 400,
                'message': 'Что-то пошло не так!',
            });
        }

        return res.redirect(equipmentTypesUrls.equipmentTypesIndex);
    });
}
