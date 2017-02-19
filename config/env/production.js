export default {
  env: 'production',
  db: process.env.DB_URI,
  port: process.env.PORT || 3000,
  apiHost: process.env.API_HOST,
  apiPath: process.env.API_PATH
};
