import dotenv from 'dotenv';

export default () => {
  dotenv.config();
  const { ACCESS_TOKEN, PIUS_UUID } = process.env;

  return {
    token: ACCESS_TOKEN,
    pius: PIUS_UUID,
  };
};
