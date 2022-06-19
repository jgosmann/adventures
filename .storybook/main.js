const path = require("path")

const toPath = _path => path.join(process.cwd(), _path)

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-gatsby",
    {
      name: "@storybook/preset-scss",
      options: {
        sassOptions: {
          includePaths: ["node_modules"],
        },
      },
    },
  ],
  framework: "@storybook/react",
  staticDirs: ["../static"],
  core: {
    builder: "webpack5",
  },
  babel: async options => ({
    ...options,
    presets: options.presets.map(preset => {
      if (preset[0].includes("@babel/preset-react")) {
        return [
          "@babel/preset-react",
          { runtime: "automatic", importSource: "@emotion/react" },
        ]
      } else {
        return preset
      }
    }),
    plugins: [...options.plugins, "@emotion/babel-plugin"],
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
    config.resolve.alias["gatsby"] = require.resolve("./mocks/gatsby.js")

    return config
  },
}
