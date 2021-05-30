import nextConnect from 'next-connect';
import { deleteUser, updateUserByUsername } from '../../db/user';
import all from '../../middleware/all';
import { NextApiResponse } from 'next';
import { ExtendedRequest } from '../../types';

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler
  .use(all)
  .get((req, res) => {
    res.status(200).json({ user: req.user });
  })
  .use((req, res, next) => {
    // handlers after this (PUT, DELETE) all require an authenticated user
    if (!req.user) {
      res.status(401).send('unauthenticated');
    } else {
      next();
    }
  })
  .put((req, res) => {
    const { name } = req.body;
    const user = updateUserByUsername(req, req.user.username, { name });
    res.json({ user });
  })
  .delete((req, res) => {
    deleteUser(req);
    req.logOut();
    res.status(204).end();
  });

export default handler;
