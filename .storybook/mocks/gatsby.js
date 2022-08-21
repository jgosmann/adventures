const React = require("react")
const PropTypes = require("prop-types")
const mockStaticQuery = require("../../test/mockStaticQuery")
module.exports = require("gatsby-original")

function Link({ to, ...props }) {
  return <a href={to} {...props} />
}

Link.propTypes = {
  to: PropTypes.string,
}

module.exports.Link = Link

module.exports.withPrefix = path => path

module.exports.useStaticQuery = mockStaticQuery.useStaticQuery
module.exports.graphql = () => undefined
