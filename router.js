const auth = require('./auth');
const passport = require('passport');
const passportService = require('./passportService');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Hello you are authenticated'});
  });
  app.post('/signin', requireSignin, auth.signin);
  app.post('/signup', auth.signup);
};

module.exports = router;
