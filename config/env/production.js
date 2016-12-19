export default {
  env: 'production',
  db: process.env.DB_URI,
  port: process.env.PORT || 3000
};
