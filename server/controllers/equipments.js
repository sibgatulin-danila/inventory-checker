const Equipment = require('../models/equipment');
const User = require('../models/user');
const EquipmentType = require('../models/equipment-type');
const {equipmentsUrls} = require('../config');

exports.index = async function (req, res) {
    const equipments = await Equipment.find({}).populate('type');
    console.log(equipments);
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

exports.equipment = function (req, res) {
    res.render('equipments-equipment');
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
