const jwt = require('jsonwebtoken');


module.exports.generateToken = function (user) {
    return jwt.sign({username: user.username, id: user._id}, process.env.SECRET_KEY, {expiresIn: 60 * 60 * 24});
}

module.exports.verifyToken = function (token) {
    return jwt.verify(token, process.env.SECRET_KEY);
}
