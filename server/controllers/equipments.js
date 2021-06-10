const Equipment = require('../models/equipment');
const User = require('../models/user');
const EquipmentType = require('../models/equipment-type');

const {equipmentsUrls} = require('../config');

exports.index = async function (req, res) {
    let equipments = await Equipment.find({})
        .populate({
            path: 'type',
            model: 'EquipmentType',
            populate: {
                path: 'parent',
                model: 'EquipmentType'
            }
        })
        .populate({
            path: 'subTypes',
            model: 'EquipmentType'
        });

    console.log(equipments)
    res.render('equipments', {
        equipments
    });
};

exports.create = function (req, res) {
    EquipmentType.find({}, function (err, equipmentTypes) {
        if (err) {
            return res.json({
                code: 400,
                message: 'Что-то пошло не так! Невозможно получить список типов оборудования. Коллекция equipment-types',
            })
        }

        User.find({role: 'user'}, function (err, users) {
            if (err) {
                return res.json({
                    code: 400,
                    message: 'Что-то пошло не так! Невозможно получить список пользователей. Коллекция users',
                })
            }

            res.render('equipments-create', {
                equipmentTypes,
                users,
                equipmentsCreateUrl: equipmentsUrls.equipmentsCreate
            });
        })
    })
};

exports.equipment = async function (req, res) {
    let equipment = await Equipment.findOne({_id: req.params.id}).populate('type').populate('user');
    let users = await User.find({role: 'user'});
    let equipmentTypes = await EquipmentType.find({});
    res.render('equipments-equipment', {
        equipment,
        users,
        equipmentTypes,
        equipmentsUpdateUrl: equipmentsUrls.equipmentsUpdate
    });
};

exports.createPost = function (req, res) {
    let data = req.body;
    let newEquipment = new Equipment(data);

    newEquipment.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code: 400,
                message: 'Что-то пошло не так! Невозможно добавить оборудование в коллекцию equipments',
            })
        }

        return res.redirect('/equipments');
    })
}

exports.updatePost = async function (req, res) {
    let data = req.body;
    let equipment = await Equipment.findOne({_id: data._id});
    Object.keys(data).forEach(key => {
        equipment[key] = data[key];
    })
    equipment.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code   : 400,
                message: 'Что-то пошло не так! Невозможно добавить оборудование в коллекцию equipments',
            })
        }
        return res.redirect('/equipments');
    });
}
