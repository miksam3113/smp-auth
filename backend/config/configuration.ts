export default () => ({
  JWT: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_REFRESH_TOKEN_KEY: process.env.JWT_REFRESH_TOKEN_KEY,
  },
});
