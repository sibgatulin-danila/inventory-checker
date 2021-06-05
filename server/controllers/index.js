const {requestUrls} = require('../config');

exports.home = function (req, res) {
    res.render('requests-create', {
        requestCreateUrl: requestUrls.requestCreate
    });
};
