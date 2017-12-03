const auth = require('./auth');
const passport = require('passport');
const passportService = require('./passportService');
const articles = require('./routes/articles');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = function(app) {
  app.get('/', function(req, res) {
    res.send({ message: 'Hello you are authenticated'});
  });

  app.post('/signin', requireSignin, auth.signin);
  app.post('/signup', auth.signup);

  // articles
  app.get('/articles', requireAuth, articles.getAll);
  app.post('/articles', requireAuth, articles.createArticle);
  app.post('/articles/delete', requireAuth, articles.deleteArticles);
};

module.exports = router;
