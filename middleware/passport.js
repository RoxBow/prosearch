import passport from 'passport';
import LocalStrategy from 'passport-local';
import { findUserByUsername, validatePassword } from '../db/user';

passport.serializeUser(function (user, done) {
  // serialize the username into session
  done(null, user.username);
});

passport.deserializeUser(function (req, username, done) {
  // deserialize the username back into user object
  const user = findUserByUsername(req, username);
  done(null, user);
});

passport.use(
  new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    const user = await findUserByUsername(req, username);

    if (!user || !validatePassword(user, password)) {
      done(null, null);
    } else {
      done(null, user);
    }
  })
);

export default passport;
