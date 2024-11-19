export const JwtConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: parseInt(process.env.JWT_EXPIRATION ?? '7884000'),
  JWT_ISSUER: process.env.JWT_ISSUER ?? '',
  JWT_AUDIENCE: process.env.JWT_AUDIENCE ?? 'JWT_APIs',
  REFRESH_TOKEN_ALIVE_TIME: process.env.REFRESH_TOKEN_ALIVE_TIME || "30 days",
  TOKEN_ALIVE_TIME: process.env.TOKEN_ALIVE_TIME || "30m"
};
