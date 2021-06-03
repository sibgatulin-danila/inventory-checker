
// api
exports.create = function (req, res) {
    res.render('requests-create');
};

exports.index = function (req, res) {
    res.render('requests');
}

exports.request = function (req, res) {
    res.render('requests-request');
}
