import nextConnect from 'next-connect';
import all from '../../middleware/all';
import passport from '../../middleware/passport';
import { NextApiResponse } from 'next';
import { ExtendedRequest } from '../../types';

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler.use(all).post(passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user });
});

export default handler;
