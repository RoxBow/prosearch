import crypto from 'crypto';
import { nanoid } from 'nanoid';

export async function getAllUsers(req) {
  return await req.db.collection('Users').find({});
}

export async function createUser(req, { username, password, email }) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  const user = {
    id: nanoid(12),
    createdAt: Date.now(),
    username,
    email,
    hash,
    salt,
  };

  await req.db
    .collection('Users')
    .insertOne(user)
    .then(({ ops }) => ops[0]);
}

export async function findUserByUsername(req, username) {
  return await req.db.collection('Users').findOne({
    username: username,
  });
}

export async function updateUserByUsername(req, username, update) {
  await req.db
    .collection('users')
    .findOneAndUpdate({ username }, { $set: update }, { returnOriginal: false })
    .then(({ value }) => value);
}

export async function deleteUser(req) {
  await req.db.collection('users').deleteOne({ id: req.user.id });
}

export function validatePassword(user, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512').toString('hex');
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
