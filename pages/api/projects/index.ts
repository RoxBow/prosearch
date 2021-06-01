import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import all from '../../../middleware/all';
import { ExtendedRequest } from '@/types/index';
import ProjectSchema from '@/models/Project';

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler
  .use(all)
  .get(async (req, res) => {
    const users = await ProjectSchema.find({});
    res.status(200).json({ success: true, users });
  })
  .post(async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Missing fields');
    }

    const project = { name };
    const projectCreated = await ProjectSchema.create(project);

    res.status(201).json({
      success: true,
      project: projectCreated,
    });
  });

export default handler;
