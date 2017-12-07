const express = require('express');
const router = express.Router();
const ArticleController = require('./controller');
const passport = require('passport');
const passportService = require('../passportService');

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/articles', requireAuth, ArticleController.getAll);
router.post('/articles', requireAuth, ArticleController.createArticle);
router.post('/articles/delete', requireAuth, ArticleController.deleteArticles);

module.exports = router;