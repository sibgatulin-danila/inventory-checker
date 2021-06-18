const moment = require('moment');

const User = require('../models/user');
const Equipment = require('../models/equipment');
const EquipmentUser = require('../models/equipment-user');
const EquipmentRepair = require('../models/equipment-repair');

const {equipmentsUrls} = require('../config');

function prependZeros (str, len, seperator) {
    if(typeof str === 'number' || Number(str)){
        str = str.toString();
        return (len - str.length > 0) ? new Array(len + 1 - str.length).join('0') + str: str;
    }
    else{
        for(var i = 0,spl = str.split(seperator || ' '); i < spl.length; spl[i] = (Number(spl[i])&& spl[i].length < len)?PrependZeros(spl[i],len):spl[i],str = (i == spl.length -1)?spl.join(seperator || ' '):str,i++);
        return str;
    }
}

exports.index = async function (req, res) {
    let params = req.query;

    let username = params.username;
    delete params.username;

    let withoutUser = params.withoutUser;
    delete params.withoutUser;

    let isDeleted = params.isDeleted;
    delete params.isDeleted;

    let query = {}

    Object.keys(params).forEach(key => {
        query[key] = {'$regex': new RegExp(params[key], 'ig')};
    })

    if (isDeleted) {
        query.deletedAt = { $ne: null };
    } else {
        query.deletedAt = null;
    }

    let users = await User.find({role: 'user'}).select('username').lean();

    let equipments = await Equipment.find(query).populate({path: 'equipmentUser', options: {sort: {$natural: -1}}, populate: {path: 'user'}});

    if (username) {
        equipments = equipments.filter(equipment => {
            if (!equipment.equipmentUser.user) {
                return false
            }
            return equipment.equipmentUser.user.username.indexOf(username) !== -1;
        })
    } else if (withoutUser) {
        equipments = equipments.filter(equipment => {
            return !equipment.equipmentUser.user;
        })
    }

    let usernames = users.map(el => {
        return el.username;
    });

    let equipmentTypes = await Equipment.distinct('type');
    let equipmentSubtypes = await Equipment.distinct('subtype');
    let equipmentBrands = await Equipment.distinct('brand');
    
    res.render('equipments', {
        usernames,
        equipments,
        equipmentTypes,
        equipmentSubtypes,
        equipmentBrands,
    });
};

exports.create = async function (req, res) {
    let users = await User.find({role: 'user'});

    let usedEquipmentTypes = await Equipment.distinct('type');
    let usedEquipmentSubtypes = await Equipment.distinct('subtype');
    let usedEquipmentBrands = await Equipment.distinct('brand');

    return res.render('equipments-create', {
        users,
        usedEquipmentTypes,
        usedEquipmentSubtypes,
        usedEquipmentBrands,
        equipmentsCreateUrl: equipmentsUrls.equipmentsCreate
    });
};

exports.equipment = async function (req, res) {
    let data = {};
    data.equipment = await Equipment.findOne({_id: req.params.id});
    data.equipmentUser = await EquipmentUser.findOne({equipment: data.equipment._id}).sort({$natural: -1});
    if (data.equipmentUser.user) {
        data.user = await User.findOne({_id: data.equipmentUser.user});
    }

    data.users = await User.find({role: 'user'});
    data.usedEquipmentTypes = await Equipment.distinct('type');
    data.usedEquipmentSubtypes = await Equipment.distinct('subtype');
    data.usedEquipmentBrands = await Equipment.distinct('brand');
    res.render('equipments-equipment', {
       ...data,
        equipmentsUpdateUrl: equipmentsUrls.equipmentsUpdate
    });
};

exports.createPost = async function (req, res) {
    let data = req.body;
    let newEquipment = new Equipment(data);

    let user = data.user;
    delete data.user;

    if (!data.inventoryCode) {
        let equipmentsCount = await Equipment.find().count()
        newEquipment.inventoryCode = prependZeros(equipmentsCount + 1, 8, '');
    }

    newEquipment.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code: 400,
                message: 'Что-то пошло не так! Невозможно добавить оборудование в коллекцию equipments',
            })
        }

        let newEquipmentUser = new EquipmentUser({user, equipment: newEquipment._id});
        newEquipmentUser.save(function (err) {
            if (err) {
                console.log(err);
                return res.json({
                    code: 400,
                    message: 'Что-то пошло не так! Невозможно добавить маппинг пользователя и оборудования в таблице equipment-user',
                })
            }
        });

        return res.redirect('/equipments');
    })
}

exports.updatePost = async function (req, res) {
    let data = req.body;

    let user = data.user;
    delete data.user;

    let isDeleted = data.isDeleted;
    delete data.isDeleted;

    if (isDeleted) {
        data.deletedAt = new Date();
    } else {
        data.deletedAt = null;
    }

    let equipment = await Equipment.findOne({_id: data._id});

    Object.keys(data).forEach(key => {
        equipment[key] = data[key];
    })

    equipment.save(async function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code   : 400,
                message: 'Что-то пошло не так! Невозможно добавить оборудование в коллекцию equipments',
            })
        }

        let equipmentUser = await EquipmentUser.findOne({equipment: equipment._id}).sort({$natural:-1});
        let isNewUserExist = !!user;
        let isEquipmentUserExist = !!equipmentUser.user;
        if (!equipmentUser
            || (isNewUserExist && !isEquipmentUserExist)
            || (!isNewUserExist && isEquipmentUserExist)
            || (isNewUserExist && isEquipmentUserExist && user !== equipmentUser.user.toString())
        ) {
            let newEquipmentUser = new EquipmentUser({equipment: equipment._id, user})
            newEquipmentUser.save(function (err) {
                if (err) {
                    console.log(err);
                    return res.json({
                        code   : 400,
                        message: 'Что-то пошло не так! Невозможно обновить маппинг пользователей и оборудования в коллекции equipment-user',
                    })
                }
            });
        }

        return res.redirect('/equipments');
    });
}

exports.moves = async function (req, res) {
    let equipmentId = req.params.id;
    let equipmentUser = await EquipmentUser.findOne({equipment: equipmentId}).sort({$natural: -1}).populate('user').populate('equipment')
    let users = await User.find({role: 'user'});

    if (!equipmentUser) {
        equipmentUser = new EquipmentUser({equipment: equipmentId, user: null})
        equipmentUser.save(function (err) {
            if (err) {
                console.log(err);
                return res.json({
                    code   : 400,
                    message: 'Что-то пошло не так! Невозможно обновить маппинг пользователей и оборудования в коллекции equipment-user',
                })
            }
        });
    }

    let equipmentUsers = await EquipmentUser.find({equipment: equipmentId}).sort({$natural: -1}).populate('user').lean()
    equipmentUsers.forEach((el, index) => {
        el.createdAt = moment(el.createdAt, moment.ISO_8601).format('DD/MM/YYYY HH:mm');
    });

    let equipmentMoves = [];

    let toIndex = 0;

    for (let fromIndex = 1; fromIndex < equipmentUsers.length; fromIndex++) {
        equipmentMoves.push({
            from: equipmentUsers[fromIndex],
            to: equipmentUsers[toIndex],
        })
        toIndex = fromIndex;
    }

    if (equipmentUsers.length > 0 && equipmentUsers[equipmentUsers.length - 1].user) {
        equipmentMoves.push({
            from: {
                user     : null,
            },
            to: equipmentUsers[equipmentUsers.length - 1]
        });
    }

    return res.render('equipments-equipment-moves', {
        equipmentUser,
        equipmentMoves,
        users,
    });
}

exports.movesPost = async function (req, res) {
    let equipmentId = req.params.id;
    let userId = req.body.user;

    let equipmentUser = await EquipmentUser.findOne({equipment: equipmentId}).sort({$natural:-1});
    let isNewUserExist = !!userId;
    let isEquipmentUserExist = !!equipmentUser.user;
    if (!equipmentUser
        || (isNewUserExist && !isEquipmentUserExist)
        || (!isNewUserExist && isEquipmentUserExist)
        || (isNewUserExist && isEquipmentUserExist && userId !== equipmentUser.user.toString())
    ) {
        let newEquipmentUser = new EquipmentUser({equipment: equipmentId, user: userId})
        newEquipmentUser.save(function (err) {
            if (err) {
                return res.json({
                    code   : 400,
                    message: 'Что-то пошло не так! Невозможно обновить маппинг пользователей и оборудования в коллекции equipment-user',
                })
            }
        });
    }

    return res.redirect('/equipments');
}

exports.repairs = async function (req, res) {
    let equipmentId = req.params.id;

    let equipment = await Equipment.findById(equipmentId);
    let equipmentRepairs = await EquipmentRepair.find({equipment: equipmentId}).sort({$natural: -1}).lean();

    equipmentRepairs.forEach(el => {
        el.createdAt = moment(el.createdAt, moment.ISO_8601).format('DD/MM/YYYY HH:mm');
        el.status = el.isSuccess ? 'Исправлено' : 'Не исправлено';
    });

    return res.render('equipments-equipment-repairs', {
        equipment,
        equipmentRepairs,
    });

}

exports.repairsPost = async function (req, res) {
    let equipmentId = req.params.id;

    let data = req.body;
    data.isSuccess = data.isSuccess === 'true';
    data.equipment = equipmentId;

    let newEquipmentRepair = new EquipmentRepair(data);

    newEquipmentRepair.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code: 400,
                message: 'Что-то пошло не так! Не удалось сохранить данные о починке оборудования в коллекции equipment-repair',
            });
        }

        return res.redirect(`/equipments/${equipmentId}/repairs`);
    })
}

exports.repair = async function (req, res) {
    let equipmentRepairId = req.params.repairId;

    let equipmentRepair = await EquipmentRepair.findById(equipmentRepairId).populate('equipment').lean();

    equipmentRepair.createdAt = moment(equipmentRepair.createdAt).format('DD/MM/YYYY HH:mm');

    return res.render('equipments-equipment-repairs-repair', {equipmentRepair});
}

exports.search = async function (req, res) {
    let data = req.body;
    let query = '/equipments?';

    Object.keys(data).forEach(key => {
        if (data[key]) {
            query += `${key}=${data[key]}&`;
        }
    })

    return res.redirect(query);
}
