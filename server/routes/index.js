const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/auth');
const searchControllers = require('../controllers/search');
const { checkIfAuthenticatedJWT } = require('../middlewares');

router.get("/", (req, res) => {
  res.send("<h1>Hello from Autocomplete Server</h1>");
});
router.post("/auth", authControllers.authenticate);
router.get("/search", checkIfAuthenticatedJWT, searchControllers.searchQuery);

module.exports = router;