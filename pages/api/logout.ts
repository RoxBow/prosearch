import nextConnect from 'next-connect';
import all from '../../middleware/all';
import { NextApiResponse } from 'next';
import { ExtendedRequest } from '../../types';

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler.use(all).get((req, res) => {
  req.logOut();
  res.status(204).end();
});

export default handler;
