const jwt = require('jsonwebtoken');

const checkIfAuthenticatedJWT = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, keypass) => {
      if (err) {
        res.status(403).send({ message: 'Token expired. Request is not authorized.' })
      } else {
        next();
      }
    })
  } else {
    res.status(401).send({ message: 'Request cannot be authenticated.'})
  }
}

module.exports = {
  checkIfAuthenticatedJWT, 
}