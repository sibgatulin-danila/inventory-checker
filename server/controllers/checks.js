const moment = require('moment');

const Equipment = require('../models/equipment');
const Check = require('../models/check');
const EquipmentCheck = require('../models/equipment-check');

exports.index = async function (req, res) {
    let checks = await Check.find().lean().then(checks => {
        let checkIds = checks.map(check => check._id);
        return Promise.all([
            checks,
            EquipmentCheck.find({check: {$in: checkIds}})
        ]);
    }).then(result => {
        let checks = result[0];
        let equipmentChecks = result[1];
        checks.forEach(check => {
            check.createdAt = moment(check.createdAt).format('DD/MM/YYYY HH:mm');
            check.checkedEquipmentsCount = (equipmentChecks.filter(equipmentCheck => {
                return equipmentCheck.check.toString() === check._id.toString();
            })).length

        });

        return checks;
    });

    return res.render('checks', {checks})
}

exports.check = async function (req, res) {
    let checkId = req.params.id;
    let check = await Check.findById(checkId).lean();
    check.createdAt = moment(check.createdAt).format('DD/MM/YYYY HH:mm');
    let equipmentsCheck = await EquipmentCheck
        .find({check: checkId})
        .populate('equipment', 'type subtype brand name inventoryCode');

    return res.render('checks-check', {
        check,
        equipmentsCheck,
    })
}

exports.create = async function (req, res) {
    let data = {
        createdAt: new Date(),
        equipmentsCount: await Equipment.find({deletedAt: null}).count(),
    }

    let newCheck = new Check(data);

    newCheck.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code: 400,
                message: 'Что-то пошло не так! Не удалось создать запись инвентаризации в коллекции checks',
            });
        }

        return res.redirect('/checks')
    });
}

exports.delete = async function (req, res) {
    let checkId = req.params.id;

    await Check.findOneAndDelete({_id: checkId});

    await EquipmentCheck.find({check: checkId}).deleteMany();

    return res.redirect('/checks');
}

exports.add = async function (req, res) {
    let inventoryCodes = await Equipment.find({deletedAt: null}).distinct('inventoryCode')

    return res.render('checks-check-add', {inventoryCodes});
}

exports.addPost = async function (req, res) {
    let checkId = req.params.id;
    let equipment = await Equipment.findOne({inventoryCode: req.body.inventoryCode});

    let oldEquipmentCheck = await EquipmentCheck.findOne({check: checkId, equipment: equipment._id});

    if (oldEquipmentCheck) {
        return res.redirect(`/checks/${checkId}/add`);
    }

    let newEquipmentCheck = new EquipmentCheck({check: checkId, equipment: equipment._id});

    newEquipmentCheck.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code: 400,
                message: 'Что-то пошло не так! Не удалось добавить запись об инвентаризации оборудования в коллекции equipment-check'
            });
        }

        return res.redirect(`/checks/${checkId}/add`)
    });
}
