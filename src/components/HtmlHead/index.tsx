import { graphql, useStaticQuery } from "gatsby"
import React from "react"

import { fontStyle } from "./font"

export interface HtmlHeadProps {
  description?: string | null
  imageSrc?: string | null
  path: string
  title?: string | null
}

const HtmlHead = ({ description, imageSrc, title, path }: HtmlHeadProps) => {
  const { site } = useStaticQuery<Queries.HtmlHeadQuery>(graphql`
    query HtmlHead {
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

  const completeTitle = (title ? `${title} | ` : "") + site?.siteMetadata?.title
  const descriptionWithFallback = description || site?.siteMetadata?.description
  const siteUrl = site?.siteMetadata?.siteUrl
  return (
    <>
      <title>{completeTitle}</title>
      <meta name="og:title" content={completeTitle} />
      {descriptionWithFallback && (
        <>
          <meta name="description" content={descriptionWithFallback} />
          <meta name="og:description" content={descriptionWithFallback} />
        </>
      )}
      {siteUrl && (
        <>
          <meta name="og:url" content={`${siteUrl}${path}`} />
          {imageSrc && (
            <meta name="og:image" content={`${siteUrl}${imageSrc}`} />
          )}
        </>
      )}
      <meta name="og:type" content="website" />
      <style type="text/css">{fontStyle}</style>
    </>
  )
}

export default HtmlHead
