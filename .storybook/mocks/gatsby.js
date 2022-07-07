const React = require("react")
const mockStaticQuery = require("../../test/mockStaticQuery")
module.exports = require("gatsby-original")

module.exports.Link = ({ to, ...props }) => <a href={to} {...props} />

module.exports.withPrefix = path => path

module.exports.useStaticQuery = mockStaticQuery.useStaticQuery
module.exports.graphql = () => undefined
