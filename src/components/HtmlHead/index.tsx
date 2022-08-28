import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import { fontStyle } from "./font"

export interface HtmlHeadProps {
  description?: string
  imageSrc?: string
  path: string
  title?: string
}

const HtmlHead = ({ description, imageSrc, title, path }: HtmlHeadProps) => {
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
    <>
      <title>{completeTitle}</title>
      <meta
        name="description"
        content={description || site.siteMetadata.description}
      />
      <meta name="og:url" content={`${site.siteMetadata.siteUrl}${path}`} />
      <meta name="og:type" content="website" />
      <meta name="og:title" content={completeTitle} />
      <meta
        name="og:description"
        content={description || site.siteMetadata.description}
      />
      {imageSrc && (
        <meta
          name="og:image"
          content={`${site.siteMetadata.siteUrl}${imageSrc}`}
        />
      )}
      <style type="text/css">{fontStyle}</style>
    </>
  )
}

export default HtmlHead
