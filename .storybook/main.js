const path = require("path")
const toPath = _path => path.join(process.cwd(), _path)
module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-gatsby",
    {
      name: "@storybook/preset-scss",
      options: {
        sassOptions: {
          includePaths: ["node_modules"],
        },
      },
    },
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  staticDirs: [
    "../static",
    "../node_modules/leaflet/dist/images",
    "../msw",
    "../test/static",
  ],

  babel: async options => ({
    ...options,
    presets: [
      [
        "@babel/preset-react",
        {
          runtime: "automatic",
          importSource: "@emotion/react",
        },
      ],
    ],
    plugins: ["@emotion/babel-plugin"],
  }),

  webpackFinal: async config => {
    config.resolve.alias["/flags"] = toPath("static/flags")
    config.resolve.alias["@emotion/core"] = toPath(
      "node_modules/@emotion/react"
    )
    config.resolve.alias["@emotion/styled"] = toPath(
      "node_modules/@emotion/styled"
    )
    config.resolve.alias["emotion-theming"] = toPath(
      "node_modules/@emotion/react"
    )
    config.resolve.alias["gatsby-original"] = require.resolve("gatsby")
    config.resolve.alias["gatsby"] = require.resolve("./mocks/gatsby.mjs")
    return config
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
}
