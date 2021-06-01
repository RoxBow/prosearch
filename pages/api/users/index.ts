import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import all from '@/middleware/all';
import { ExtendedRequest } from '@/types/index';
import UserSchema from '../../../models/User';
import { nanoid } from 'nanoid';
import crypto from 'crypto';

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler
  .use(all)
  .get(async (req, res) => {
    const users = await UserSchema.find({});
    res.status(200).json({ success: true, users });
  })
  .post(async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).send('Missing fields');
    }

    const usernameExisted = !!(await UserSchema.findOne({ $or: [{ username }, { email }] }).exec());
    if (usernameExisted) {
      return res.status(409).send('The username has already been used');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const user = {
      username,
      email,
      hash,
      salt,
    };
    const userCreated = await UserSchema.create(user);

    req.logIn(user, err => {
      if (err) throw err;
      // Log the signed up user in
      res.status(201).json({
        user: userCreated,
      });
    });
  });

export default handler;
