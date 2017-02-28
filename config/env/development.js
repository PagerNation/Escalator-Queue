export default {
  env: 'development',
  db: 'mongodb://localhost/escalator-queue-development',
  port: 3003,
  apiHost: `${process.env.API_HOST}:${process.env.API_PORT}`,
  apiPath: process.env.API_PATH,
  apiToken: process.env.API_TOKEN,
  pageQueueSize: process.env.PAGE_QUEUE_SIZE
};
