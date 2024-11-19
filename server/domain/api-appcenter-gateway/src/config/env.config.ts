import path from 'path';

export const __ROOT_DIR__ = path.resolve(__dirname, '..', '..');

export const EnvironmentConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT ?? '8080'),
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  CORS_CREDENTIALS: process.env.CORS_CREDENTIALS === 'true',
  API_PREFIX: process.env.API_PREFIX ?? '/api',
  USE_TCP_EVENTS_BUS: process.env.USE_TCP_EVENTS_BUS,
  TCP_PORT: process.env.TCP_PORT,
  USE_REDIS_EVENTS_BUS: process.env.USE_REDIS_EVENTS_BUS,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
};
