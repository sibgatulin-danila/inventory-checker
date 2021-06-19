const moment = require('moment')

const Request = require('../models/request');
const Equipment = require('../models/equipment');
const User = require('../models/user');

const {requestsUrls, requestsStatuses, requestsTypes} = require('../config');

exports.index = async function (req, res) {
    let query = req.query;

    let username = query.username;
    delete query.username;

    let requests = await Request.find(query).populate('user', 'username').lean();

    if (username) {
        requests = requests.filter(request => {
            return request.user.username.indexOf(username) !== -1;
        })
    }

    requests.forEach(request => {
        request.type = requestsTypes[request.type].lang;
        request.status = {
            name: requestsStatuses[request.status].lang,
            class: requestsStatuses[request.status].class,
        };
    });

    let usernames = await User.find({role: 'user'}).distinct('username')

    return res.render('requests', {
        requests,
        requestsTypes: (Object.values(requestsTypes)),
        requestsStatuses: Object.values(requestsStatuses),
        usernames,
    });
}

exports.buy = async function (req, res) {
    return res.render('requests-buy');
}

exports.buyPost = function (req, res) {
    let data = req.body;
    data.user = req.user._id;
    data.type = requestsTypes.buy.name;

    let newRequest = new Request(data);

    newRequest.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code: 400,
                message: 'Что-то пошло не так! Невозможно добавить заявку в коллекцию requests',
            })
        }
    });

    return res.redirect('/requests');
}

exports.repair = async function (req, res) {
    let userId = req.user._id;
    let equipments = await Equipment.find().populate({path: 'equipmentUser', options: {sort: {$natural: -1}}, populate: {path: 'user'}});
    equipments = equipments.filter(equipment => {
        return !!equipment.equipmentUser.user && userId.toString() === equipment.equipmentUser.user._id.toString();
    })

    return res.render('requests-repair', {
        equipments,
    })
}

exports.repairPost = async function (req, res) {
    let data = req.body;
    data.user = req.user._id;
    data.type = requestsTypes.repair.name;

    let newRequest = new Request(data);

    newRequest.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code: 400,
                message: 'Кажется что-то пошло не так! Не удалось добавить заявку на ремонт оборудования в коллекции requests',
            });
        }

        return res.redirect('/requests');
    });
}

exports.move = async function (req, res) {
    let userId = req.user._id;
    let equipments = await Equipment.find().populate({path: 'equipmentUser', options: {sort: {$natural: -1}}, populate: {path: 'user'}});

    equipments = equipments.filter(equipment => {
        return !!equipment.equipmentUser.user && userId.toString() === equipment.equipmentUser.user._id.toString();
    })

    let users = await User.find({role: 'user', _id: {$ne: userId}});

    return res.render('requests-move', {
        equipments,
        users,
    })
}

exports.movePost = async function (req, res) {
    let data = req.body;
    data.user = req.user._id;
    data.type = requestsTypes.move.name;

    let newRequest = new Request(data);

    newRequest.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code: 400,
                message: 'Кажется что-то пошло не так! Не удалось добавить заявку на передачу оборудования в коллекции requests',
            });
        }

        return res.redirect('/requests');
    });
}

exports.remove = async function (req, res) {
    let userId = req.user._id;
    let equipments = await Equipment.find().populate({path: 'equipmentUser', options: {sort: {$natural: -1}}, populate: {path: 'user'}});

    equipments = equipments.filter(equipment => {
        return !!equipment.equipmentUser.user && userId.toString() === equipment.equipmentUser.user._id.toString();
    });

    return res.render('requests-remove', {
        equipments
    });
}

exports.removePost = async function (req, res) {
    let data = req.body;
    data.user = req.user._id;
    data.type = requestsTypes.remove.name;

    let newRequest = new Request(data);

    newRequest.save(function (err) {
        if (err) {
            console.log(err);
            return res.json({
                code: 400,
                message: 'Кажется что-то пошло не так! Не удалось добавить заявку на списание оборудования в коллекции requests',
            });
        }

        return res.redirect('/requests');
    });
}

exports.create = async function (req, res) {
    await req.user.populate("equipments").execPopulate()
    res.render('requests-create', {
        requestsCreateUrl: requestsUrls.requestsCreate,
    });
}

exports.request = async function (req, res) {
    let requestId = req.params.id;

    let request = await Request
        .findById(requestId)
        .populate('user', 'username phone')
        .populate('equipment', 'type subtype brand name')
        .lean();

    request.createdAt = moment(request.createdAt, moment.ISO_8601).format('DD/MM/YYYY HH:mm')

    res.render('requests-request', {
        request,
        requestsStatuses,
        requestsTypes,
    });
}

exports.search = function (req, res) {
    let data = req.body;
    let query = '/requests?';

    Object.keys(data).forEach(key => {
        if (data[key]) {
            query += `${key}=${data[key]}&`;
        }
    })

    return res.redirect(query);
}
