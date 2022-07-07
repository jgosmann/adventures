const babelOptions = {
  presets: [
    "babel-preset-gatsby",
    "@babel/preset-typescript",
    "@emotion/babel-preset-css-prop",
  ],
}
module.exports = require("babel-jest").default.createTransformer(babelOptions)
