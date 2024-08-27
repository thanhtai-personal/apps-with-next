module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:sonarjs/recommended",
    "prettier",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: [
    "prettier",
    "@typescript-eslint",
    "import",
    "sonarjs",
    "eslint-plugin-tsdoc",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: [".*.js", "node_modules/", "dist/"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-redundant-type-constituents": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "prettier/prettier": "error",
    "react-refresh/only-export-components": "off",
    "sonarjs/no-duplicate-string": ["off", { threshold: 5 }],
    "sonarjs/cognitive-complexity": "warn",
    "max-lines": [
      "warn",
      {
        max: 250,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    "max-statements": [
      "warn",
      {
        max: 500,
      },
    ],
    "import/no-unresolved": "off",
    "import/no-named-as-default": 0,
  },
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
};
