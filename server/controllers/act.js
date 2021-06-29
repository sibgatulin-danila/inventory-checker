const moment = require('moment');

const EquipmentUser = require('../models/equipment-user');
const EquipmentRepair = require('../models/equipment-repair');

exports.move = async function (req, res) {
    let data = {};

    data.equipmentUser = await EquipmentUser
        .findOne({equipment: req.params.id})
        .sort({$natural: -1})
        .populate('user')
        .populate('equipment')
        .lean();

    data.equipmentUser.createdAtDay = moment(data.equipmentUser.createdAt, moment.ISO_8601).format('DD')
    data.equipmentUser.createdAtMonth = moment(data.equipmentUser.createdAt, moment.ISO_8601).lang('ru').format('MMMM')
    data.equipmentUser.createdAtYear = moment(data.equipmentUser.createdAt, moment.ISO_8601).format('YYYY')

    return res.render('act-move', data);
}

exports.repair = async function (req, res) {
    let data = {};

    data.equipmentRepair = await EquipmentRepair
        .findOne({_id: req.params.id})
        .populate('equipment')
        .lean();

    data.equipmentRepair.createdAtDay = moment(data.equipmentRepair.createdAt, moment.ISO_8601).format('DD')
    data.equipmentRepair.createdAtMonth = moment(data.equipmentRepair.createdAt, moment.ISO_8601).lang('ru').format('MMMM')
    data.equipmentRepair.createdAtYear = moment(data.equipmentRepair.createdAt, moment.ISO_8601).format('YYYY')

    return res.render('act-repair', data);
}
