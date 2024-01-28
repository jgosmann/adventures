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
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      processor: "@graphql-eslint/graphql",
      extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:storybook/recommended",
        "plugin:jest-dom/recommended",
        "prettier",
      ],
    },
    {
      files: ["*.graphql"],
      parser: "@graphql-eslint/eslint-plugin",
      plugins: ["@graphql-eslint"],
      rules: {
        "@graphql-eslint/no-anonymous-operations": "error",
        "@graphql-eslint/naming-convention": [
          "error",
          {
            OperationDefinition: {
              style: "PascalCase",
              forbiddenPrefixes: ["Query", "Mutation", "Subscription", "Get"],
              forbiddenSuffixes: ["Query", "Mutation", "Subscription"],
            },
          },
        ],
      },
    },
    {
      files: [
        ".eslintrc.js",
        "gatsby-browser.js",
        "gatsby-config.js",
        "gatsby-node.js",
        "graphql.config.js",
        "jest.config.js",
        "jest.polyfills.js",
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
