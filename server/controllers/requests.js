const Request = require('../models/request');
const Equipment = require('../models/equipment');

const {requestsUrls, requestsTypes} = require('../config');

exports.index = async function (req, res) {
    let conditions = {};
    let requests = await Request.find(conditions);
    return res.render('requests', {
        requests
    });
}

exports.create = async function (req, res) {
    await req.user.populate("equipments").execPopulate()
    res.render('requests-create', {
        requestsCreateUrl: requestsUrls.requestsCreate,
    });
};

exports.request = function (req, res) {
    res.render('requests-request');
}
