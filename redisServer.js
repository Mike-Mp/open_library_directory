const redis = require("redis");
const { promisify } = require("es6-promisify");

export const client = redis.createClient({
  host: "localhost",
  port: process.env.REDIS_PORT,
});

export const GET = promisify(client.get).bind(client);
export const SET = promisify(client.set).bind(client);
