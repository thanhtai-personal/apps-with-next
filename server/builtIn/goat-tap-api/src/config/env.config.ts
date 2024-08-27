import path from 'path';

export const __ROOT_DIR__ = path.resolve(__dirname, '..', '..');

export const EnvironmentConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT ?? '7749'),
  ADMIN_PORT: parseInt(process.env.ADMIN_PORT ?? '7070'),
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS === 'true',
  API_PREFIX: process.env.API_PREFIX ?? '/api',
  ROOT_URL: process.env.ROOT_URL ?? 'http://localhost:7749',
};
