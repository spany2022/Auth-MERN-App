const express = require('express');
const ensureAuthenticated = require('../Middlewares/Auth');
const contact = require('../Controllers/ContactController');
const router = new express.Router();

router.post('/', ensureAuthenticated, contact);

module.exports = router;