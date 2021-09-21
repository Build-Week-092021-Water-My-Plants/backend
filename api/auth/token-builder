const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../data/db-config')

function tokenBuilder(user) {   
    const payload = {
      sub: user.user_id,
      username: user.username,
    };
    const options = {
      expiresIn: "1d",
    };
    const result = jwt.sign(payload, JWT_SECRET, options);
    return result;
  }

  module.exports = tokenBuilder