export default {
  env: 'production',
  db: process.env.DB_URI,
  port: process.env.PORT || 3000,
  apiHost: `${process.env.API_HOST}:${process.env.API_PORT}`,
  apiPath: process.env.API_PATH,
  apiToken: process.env.API_TOKEN,
  pageQueueSize: process.env.PAGE_QUEUE_SIZE
};
