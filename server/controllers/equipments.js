const Equipment = require('../models/equipment');
const User = require('../models/user');
const EquipmentUser = require('../models/equipment-user');

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
    let equipments = await Equipment.find({});

    res.render('equipments', {
        equipments
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
    let lastEquipment = await Equipment.findOne().sort({$natural:-1})

    let user = data.user;
    delete data.user;

    if (!lastEquipment) {
        newEquipment.inventoryCode = prependZeros(1, 8, '');
    } else {
        let lastEquipment = await Equipment.findOne().sort({$natural:-1})
        newEquipment.inventoryCode = prependZeros((parseInt(lastEquipment.inventoryCode) + 1.), 8, '');
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
    delete data.inventoryCode;

    let user = data.user;
    delete data.user;

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

    let equipmentUsers = await EquipmentUser.find({equipment: equipmentId}).sort({$natural: -1}).populate('user')
    console.log(equipmentUsers);

    return res.render('equipments-moves', {
        equipmentUser,
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
