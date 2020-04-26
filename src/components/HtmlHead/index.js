import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Helmet } from "react-helmet"

import { fontStyle } from "./font"

const HtmlHead = ({ title, language, path }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
        }
      }
    }
  `)

  return (
    <Helmet
      defaultTitle={site.siteMetadata.title}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      htmlAttributes={{ lang: language }}
      meta={[
        {
          name: `description`,
          content: site.siteMetadata.description,
        },
        {
          name: `og:url`,
          content: `${site.siteMetadata.siteUrl}${path}`,
        },
        {
          name: `og:type`,
          content: `website`,
        },
        {
          name: `og:title`,
          content: title || site.siteMetadata.title,
        },
        {
          name: `og:description`,
          content: site.siteMetadata.description,
        },
      ]}
    >
      <style type="text/css">{fontStyle}</style>
    </Helmet>
  )
}

HtmlHead.propTypes = {
  language: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default HtmlHead
