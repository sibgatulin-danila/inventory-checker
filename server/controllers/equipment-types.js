const EquipmentType = require('../models/equipment-type');
const {equipmentTypesUrls} = require('../config');

exports.index = async function (req, res) {
    let equipmentTypes = await EquipmentType.find({});

    res.render('equipment-types', {
        equipmentTypes
    });
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

exports.equipmentType = async function (req, res) {
    let equipmentType = await EquipmentType.findOne({_id: req.params.id});
    return res.render('equipment-types-equipment-type', {
        equipmentType,
        equipmentTypesUpdateUrl: equipmentTypesUrls.equipmentTypesUpdate
    });
}

exports.updatePost = async function (req, res) {
    let data = req.body;
    let equipmentType = await EquipmentType.findOne({_id: data._id});

    Object.keys(data).forEach(key => {
        equipmentType[key] = data[key];
    })
    equipmentType.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code   : 400,
                message: 'Что-то пошло не так! Невозможно добавить оборудование в коллекцию equipments',
            })
        }
        return res.redirect('/equipments/types');
    });
}
