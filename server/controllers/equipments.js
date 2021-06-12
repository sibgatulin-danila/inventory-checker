const Equipment = require('../models/equipment');
const User = require('../models/user');

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
    let equipment = await Equipment.findOne({_id: req.params.id}).populate('user');
    let users = await User.find({role: 'user'});

    let usedEquipmentTypes = await Equipment.distinct('type');
    let usedEquipmentSubtypes = await Equipment.distinct('subtype');
    let usedEquipmentBrands = await Equipment.distinct('brand');

    res.render('equipments-equipment', {
        equipment,
        users,
        usedEquipmentTypes,
        usedEquipmentSubtypes,
        usedEquipmentBrands,
        equipmentsUpdateUrl: equipmentsUrls.equipmentsUpdate
    });
};

exports.createPost = async function (req, res) {
    let data = req.body;
    let newEquipment = new Equipment(data);
    let lastEquipment = await Equipment.findOne().sort({$natural:-1})

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

        return res.redirect('/equipments');
    })
}

exports.updatePost = async function (req, res) {
    let data = req.body;
    delete data.inventoryCode;

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
