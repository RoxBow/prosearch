import { NextApiRequest } from 'next';

export type ExtendedRequest = NextApiRequest & Express.Request;
