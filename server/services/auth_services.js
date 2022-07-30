// authentication
const jwt = require('jsonwebtoken');

class AuthServices {

  constructor() {}

  generateAccessToken = (keypass, secret, expiresIn) => {
    return jwt.sign({
      'keypass' : keypass,
    }, secret, {
      expiresIn
    });
  }

}

module.exports = AuthServices;
