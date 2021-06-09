const EquipmentType = require('../models/equipment-type');
const {equipmentTypesUrls} = require('../config');

exports.index = async function (req, res) {
    let equipmentTypes = await EquipmentType.find({parent: undefined});

    res.render('equipment-types', {
        equipmentTypes
    });
};

exports.create = async function (req, res) {
    let parentsTypes = await EquipmentType.find({parent: undefined})
    return res.render('equipment-types-create', {
        equipmentTypesCreateUrl: equipmentTypesUrls.equipmentTypesCreate,
        parentsEquipmentTypes: parentsTypes,
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
    let data = {};

    data.equipmentTypesUpdateUrl = equipmentTypesUrls.equipmentTypesUpdate;

    let equipmentType = await EquipmentType.findOne({_id: req.params.id});
    data.equipmentType = equipmentType;

    data.subEquipmentTypes = await EquipmentType.find({parent: req.params.id});

    let isParent = !equipmentType.parent;
    console.log(isParent)
    if (!isParent) {
        data.parentEquipmentTypes = await EquipmentType.find({parent: undefined});
    }

    return res.render('equipment-types-equipment-type', data);
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
