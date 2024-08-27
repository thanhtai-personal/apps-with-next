module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --quiet --fix"],
  "*.{json,md,mdx,html}": ["prettier --write --ignore-unknown"],
};
