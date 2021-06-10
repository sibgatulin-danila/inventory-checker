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

    newEquipmentType.save(async function (err) {
        if (err) {
            return res.json({
                'code': 400,
                'message': 'Что-то пошло не так!',
            });
        }

        if (newEquipmentType.parent) {
            await newEquipmentType.populate('parent').execPopulate()
            newEquipmentType.parent.subTypes.push(newEquipmentType);
            newEquipmentType.parent.save();
        }

        return res.redirect(equipmentTypesUrls.equipmentTypesIndex);
    });
}

exports.equipmentType = async function (req, res) {
    let data = {};

    data.equipmentTypesUpdateUrl = equipmentTypesUrls.equipmentTypesUpdate;

    let equipmentType = await EquipmentType.findOne({_id: req.params.id}).populate('subTypes');
    data.equipmentType = equipmentType;

    let isParent = !equipmentType.parent;

    if (!isParent) {
        data.parentEquipmentTypes = await EquipmentType.find({parent: undefined});
    }

    return res.render('equipment-types-equipment-type', data);
}

exports.updatePost = async function (req, res) {
    let data = req.body;
    let equipmentType = await EquipmentType.findOne({_id: data._id}).populate('parent');

    let oldParent = equipmentType.parent;

    Object.keys(data).forEach(key => {
        equipmentType[key] = data[key];
    })
    equipmentType.save(async function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code   : 400,
                message: 'Что-то пошло не так! Невозможно добавить оборудование в коллекцию equipments',
            })
        }

        if (equipmentType.parent) {
            equipmentType.parent.subTypes.push(equipmentType);
            equipmentType.parent.save();
        } else {
            oldParent.subTypes.pull(equipmentType._id);
            oldParent.save();
        }

        return res.redirect('/equipments/types');
    });
}
