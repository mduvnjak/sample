const express = require('express');

const passport = require('passport');
const passportService = require('./passportService');

const users = require('./user/routes');
const articles = require('./article/routes');

const path = require('path');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const staticPath = 'public/www';

const router = function(app) {
  app.use(express.static(staticPath));

  app.use('/api/', articles);
  app.use('/api/', users);

  app.use('/', express.static(staticPath));
  app.use('/articles', express.static(staticPath));
  app.use('/signin', express.static(staticPath));
  app.use('/signup', express.static(staticPath));
};

module.exports = router;
