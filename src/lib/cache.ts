import { User, Website } from '@prisma/client';
import redis from '@umami/redis-client';
import { getSession, getUserById, getWebsiteById } from '../queries';

async function fetchWebsite(id): Promise<Website> {
  return redis.fetchObject(`website:${id}`, () => getWebsiteById(id), 86400);
}

async function storeWebsite(data) {
  const { id } = data;
  const key = `website:${id}`;

  const obj = await redis.storeObject(key, data);
  await redis.expire(key, 86400);

  return obj;
}

async function deleteWebsite(id) {
  return redis.deleteObject(`website:${id}`);
}

async function fetchUser(id): Promise<User> {
  return redis.fetchObject(`user:${id}`, () => getUserById(id, { includePassword: true }), 86400);
}

async function storeUser(data) {
  const { id } = data;
  const key = `user:${id}`;

  const obj = await redis.storeObject(key, data);
  await redis.expire(key, 86400);

  return obj;
}

async function deleteUser(id) {
  return redis.deleteObject(`user:${id}`);
}

async function fetchSession(id) {
  return redis.fetchObject(`session:${id}`, () => getSession(id), 86400);
}

async function storeSession(data) {
  const { id } = data;
  const key = `session:${id}`;

  const obj = await redis.storeObject(key, data);
  await redis.expire(key, 86400);

  return obj;
}

async function deleteSession(id) {
  return redis.deleteObject(`session:${id}`);
}

async function fetchUserBlock(userId: string) {
  const key = `user:block:${userId}`;
  return redis.get(key);
}

async function incrementUserBlock(userId: string) {
  const key = `user:block:${userId}`;
  return redis.incr(key);
}

export default {
  fetchWebsite,
  storeWebsite,
  deleteWebsite,
  fetchUser,
  storeUser,
  deleteUser,
  fetchSession,
  storeSession,
  deleteSession,
  fetchUserBlock,
  incrementUserBlock,
  enabled: !!redis,
};
