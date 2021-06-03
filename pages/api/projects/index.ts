import { NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import all from '../../../middleware/all';
import { ExtendedRequest } from '@/types/index';
import ProjectSchema from '@/models/Project';
import UserSchema from '@/models/User';

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler
  .use(all)
  .get(async (req, res) => {
    const projects = await ProjectSchema.find({}).populate('author', 'username');
    res.status(200).json({ success: true, projects });
  })
  .use((req, res, next) => {
    if (!req.user) {
      res.status(401).send('unauthenticated');
    } else {
      next();
    }
  })
  .post(async (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send('Missing fields');
    }

    const project = { name, author: req.user._id };
    const projectCreated = await ProjectSchema.create(project).then(async docProject => {
      await UserSchema.findByIdAndUpdate(
        req.user._id,
        { $push: { projects: docProject._id } },
        { new: true, useFindAndModify: false }
      );

      return docProject;
    });

    res.status(201).json({
      success: true,
      project: projectCreated,
    });
  });

export default handler;
