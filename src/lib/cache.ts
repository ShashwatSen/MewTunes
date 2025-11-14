import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL);

export async function getCache(key: string) {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCache(key: string, value: any, ttl = 7200) {
  return redis.set(key, JSON.stringify(value), "EX", ttl);
}
