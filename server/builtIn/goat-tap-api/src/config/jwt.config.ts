export const JwtConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION: parseInt(process.env.JWT_EXPIRATION ?? '7884000'),
  JWT_ISSUER: process.env.JWT_ISSUER ?? 'https://myfrens.io',
  JWT_AUDIENCE: process.env.JWT_AUDIENCE ?? 'JWT_APIs',
};
