export const EncryptConfig = {
  secretKey: process.env.ENCRYPT_SECRET_KEY,
  saltOrRounds: process.env.SALT_OR_ROUNDS || 10
};
