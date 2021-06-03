import nextConnect from 'next-connect';
import all from '../../../middleware/all';
import { NextApiResponse } from 'next';
import { ExtendedRequest } from '@/types/index';
import UserSchema from '../../../models/User';

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler
  .use(all)
  .get(async (req, res) => {
    const { id } = req.query;

    if (id === 'me' && req.user) return res.status(200).json({ success: true, user: req.user });
    if (id === 'me' && !req.user) return res.status(400).json({ success: false });

    const user = await UserSchema.findById(id);

    if (!user) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, user });
  })
  .use((req, res, next) => {
    if (!req.user) {
      res.status(401).send('unauthenticated');
    } else {
      next();
    }
  })
  .put(async (req, res) => {
    if (req.user.id !== req.query.id) return res.status(401).send('unauthorized');

    const user = await UserSchema.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, user });
  })
  .delete(async (req, res) => {
    if (req.user.id !== req.query.id) return res.status(401).send('unauthorized');

    await UserSchema.deleteOne({ _id: req.user.id });
    req.logOut();
    res.status(200).json({ success: true });
  });

export default handler;
