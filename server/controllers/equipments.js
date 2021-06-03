exports.index = function (req, res) {
    res.render('equipments');
};

exports.create = function (req, res) {
    res.render('equipments-create');
};

exports.equipment = function (req, res) {
    res.render('equipments-equipment');
};
