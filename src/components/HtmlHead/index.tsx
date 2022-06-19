import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"

import { fontStyle } from "./font"

export interface HtmlHeadProps {
  description?: string
  language: string
  imageSrc?: string
  path: string
  title?: string
}

const HtmlHead = ({
  description,
  imageSrc,
  title,
  language,
  path,
}: HtmlHeadProps) => {
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

export default HtmlHead
