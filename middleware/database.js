import { MongoClient } from 'mongodb';

const URI = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('prosearch');
  return next();
}

export default database;
