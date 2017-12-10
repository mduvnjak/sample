const express = require('express');
const router = express.Router();
const ArticleController = require('./controller');
const passport = require('passport');
const passportService = require('../passportService');

const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/articles', requireAuth, ArticleController.getAll);
router.post('/articles/create', requireAuth, ArticleController.createArticle);
router.post('/articles/delete', requireAuth, ArticleController.deleteArticles);
router.post('/articles/votes', requireAuth, ArticleController.voteArticle);

module.exports = router;
