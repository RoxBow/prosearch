import nextConnect from 'next-connect';
import database from './database';
import passport from './passport';
import session from './session';

const all = nextConnect()
  .use(
    session({
      name: 'sess',
      secret: process.env.TOKEN_SECRET,
      cookie: {
        maxAge: 60 * 60 * 8, // 8 hours,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      },
    })
  )
  .use(database)
  .use(passport.initialize())
  .use(passport.session());

export default all;
