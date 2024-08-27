// module exports
module.exports = {
  extends: ["./base.js", "plugin:react-hooks/recommended"],
  plugins: ["react-hooks"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
  },
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ["*.js?(x)", "*.ts?(x)"] },
  ],
};
