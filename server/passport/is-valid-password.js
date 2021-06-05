const bcrypt = require('bcryptjs');

module.exports.isValidPassword = function (user, password) {
    return bcrypt.compareSync(password, user.password);
}
