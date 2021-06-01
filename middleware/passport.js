import passport from 'passport';
import LocalStrategy from 'passport-local';
import validatePassword from '../utils/validatePassword';
import UserSchema from '@/models/User';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (req, id, done) => {
  const user = await UserSchema.findById(id);
  done(null, user);
});

passport.use(
  new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    const user = await UserSchema.findOne({ username });

    if (!user || !validatePassword(user, password)) {
      done(null, null);
    } else {
      done(null, user);
    }
  })
);

export default passport;
