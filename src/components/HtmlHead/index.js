import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Helmet } from "react-helmet"

import { fontStyle } from "./font"

const HtmlHead = ({ description, imageSrc, title, language, path }) => {
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

  const completeTitle = (title ? `${title} | ` : "") + site.siteMetadata.title
  return (
    <Helmet
      defaultTitle={site.siteMetadata.title}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      htmlAttributes={{ lang: language }}
      meta={[
        {
          name: `description`,
          content: description || site.siteMetadata.description,
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
          content: completeTitle,
        },
        {
          name: `og:description`,
          content: description || site.siteMetadata.description,
        },
        ...(imageSrc
          ? [
              {
                name: `og:image`,
                content: `${site.siteMetadata.siteUrl}${imageSrc}`,
              },
            ]
          : []),
      ]}
    >
      <style type="text/css">{fontStyle}</style>
    </Helmet>
  )
}

HtmlHead.propTypes = {
  description: PropTypes.string,
  language: PropTypes.string.isRequired,
  imageSrc: PropTypes.string,
  path: PropTypes.string.isRequired,
  title: PropTypes.string,
}

export default HtmlHead
