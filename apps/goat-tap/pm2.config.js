module.exports = {
  apps: [
    {
      name: 'goattap-client',
      script: 'pnpm',
      args: 'build',
      env: {
        VITE_BASE_URL: 'https://goat-tap.decentrust.io/',
        VITE_API_URL: 'https://api-goat-tap.decentrust.io/',
        VITE_TELEGRAM_BOT_URL: 'https://t.me/goattapdevbot',
        VITE_TELEGRAM_BOT_WALLET_ADDRESS: 'UQDozoVJzP-Va28QA8A3OG01ebBH31h1ofxb2wmzKYx-3pVK',
        VITE_IS_TEST_NET: true,
      },
      // Optional: specify the build directory
      cwd: './dist', // adjust according to your build output
    },
  ],
};