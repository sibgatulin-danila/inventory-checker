const {requestsUrls} = require('../config');

exports.home = function (req, res) {
    res.render('requests-create', {
        requestsCreateUrl: requestsUrls.requestsCreate
    });
};
