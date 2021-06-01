import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import { getAllUsers, createUser, findUserByUsername } from '../../db/user';
import all from '../../middleware/all';
import { ExtendedRequest } from '../../types';

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler
  .use(all)
  .get(async (req, res) => {
    const users = await getAllUsers(req);
    res.json({ users });
  })
  .post(async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).send('Missing fields');
    }

    const usernameExisted = !!(await findUserByUsername(req, username));
    if (usernameExisted) {
      return res.status(409).send('The username has already been used');
    }
    const user = { username, password, email };
    await createUser(req, user);

    req.logIn(user, err => {
      if (err) throw err;
      // Log the signed up user in
      res.status(201).json({
        user,
      });
    });
  });

export default handler;
