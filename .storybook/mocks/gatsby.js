module.exports = require("gatsby-original")

module.exports.withPrefix = path => path

let nextStaticQueryResult

module.exports.useStaticQuery = () => {
  return nextStaticQueryResult
}

module.exports.graphql = () => undefined

module.exports.decorator = (story, { parameters }) => {
  if (parameters && parameters.staticQuery) {
    nextStaticQueryResult = parameters.staticQuery
  }
  return story()
}
