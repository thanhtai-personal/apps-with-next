export const DatabaseConfig = {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT || '5432'),
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_LOGGING: process.env.DB_LOGGING === 'true',
};
