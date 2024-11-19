export const TelegramBotConfig = {
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_BOT_POOLING: process.env.TELEGRAM_BOT_POOLING === 'true',
  TELEGRAM_BOT_WALLET_ADDRESS: process.env.TELEGRAM_BOT_WALLET_ADDRESS,
  ORIGIN: "https://api.telegram.org/bot",
  CLIENT_URL: process.env.CLIENT_URL
};
