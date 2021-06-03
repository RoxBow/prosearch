import nextConnect from 'next-connect';
import all from '../../../middleware/all';
import { NextApiResponse } from 'next';
import { ExtendedRequest } from '@/types/index';
import ProjectSchema from '@/models/Project';

const handler = nextConnect<ExtendedRequest, NextApiResponse>();

handler
  .use(all)
  .get(async (req, res) => {
    const { id } = req.query;
    const project = await ProjectSchema.findById(id).populate('author', '_id');

    if (!project) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, project });
  })
  .use((req, res, next) => {
    if (!req.user) {
      res.status(401).send('unauthenticated');
    } else {
      next();
    }
  })
  .put(async (req, res) => {
    let docProject = await ProjectSchema.findOne({ _id: req.query.id }).populate('author', '_id');

    if (!docProject) {
      return res.status(400).json({ success: false });
    }

    if (req.user.id !== docProject.author.id) return res.status(401).send('unauthorized');

    Object.entries(req.body).forEach(([key, value]) => {
      docProject[key] = value;
    });

    const project = await docProject.save();

    res.status(200).json({ success: true, project });
  })
  .delete(async (req, res) => {
    if (req.user.id !== req.query.id) return res.status(401).send('unauthorized');

    await ProjectSchema.deleteOne({ _id: req.body.id });
    req.logOut();
    res.status(200).json({ success: true });
  });

export default handler;
