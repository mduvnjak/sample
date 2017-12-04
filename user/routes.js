const express = require('express');
const router = express.Router();
const UserController = require('./controller');

const passport = require('passport');
const passportService = require('../passportService');

const requireSignin = passport.authenticate('local', { session: false });

router.post('/login', requireSignin, UserController.signin);
router.post('/register', UserController.signup);

module.exports = router;
