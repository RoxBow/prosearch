import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function database(req, res, next) {
  const opts = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
    bufferMaxEntries: 0,
    useFindAndModify: false,
  };

  global.mongoose = await mongoose.connect(MONGODB_URI, opts);

  return next();
}

export default database;
