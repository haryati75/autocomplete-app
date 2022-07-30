const AuthServices = require('../services/auth_services');

const authenticate = (req, res) => {
  const keypassReceived = req.body.keypass
  try {
    if (keypassReceived === process.env.MYAPP_KEYPASS) {
      console.log('Authenticated!');
      let authServices = new AuthServices()
      let access_token = authServices.generateAccessToken(keypassReceived, process.env.TOKEN_SECRET, '60m');
      res.send({ access_token })
    } else {
      throw new Error('Invalid keypass!!')
    }
  } catch (err) {
    console.log('ERROR /auth keypass', err)
    res.send(err);
  }
}

module.exports = {
  authenticate
}