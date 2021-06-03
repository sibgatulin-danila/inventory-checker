exports.index = function (req, res) {
    res.render('equipments');
};

exports.create = function (req, res) {
    res.render('equipments-create');
};

exports.employee = function (req, res) {
    res.render('equipments-equipment');
};
