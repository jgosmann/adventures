module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:storybook/recommended",
    "plugin:jest-dom/recommended",
    "plugin:cypress/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "cypress"],
  rules: {},
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:storybook/recommended",
        "plugin:jest-dom/recommended",
        "plugin:cypress/recommended",
        "prettier",
      ],
    },
    {
      files: [
        ".eslintrc.js",
        "cypress/**/*",
        "gatsby-browser.js",
        "gatsby-config.js",
        "gatsby-node.js",
        "jest.config.js",
        "jest-preprocess.js",
        "loadershim.js",
        ".storybook/main.js",
        ".storybook/mocks/*.js",
      ],
      env: {
        browser: false,
        node: true,
      },
    },
  ],
  settings: {
    react: { version: "detect" },
  },
}
