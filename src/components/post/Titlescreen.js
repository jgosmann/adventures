import styled from "@emotion/styled"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

import PostMeta from "../../components/PostMeta"

export const dataFragment = graphql`
  fragment Titlescreen_data on Mdx {
    background {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
    frontmatter {
      title
    }
    ...PostMeta_data
  }
`

const titleStyle = {
  fontSize: "4vw",
  "@media (max-width: 600px)": {
    fontSize: 24,
  },
  "@media (min-width: 1600px)": {
    fontSize: 64,
  },
  textShadow: "2px 2px 4px #000",
  marginBottom: 32,
  overflowWrap: "break-word",
  hyphens: "auto",
  fontWeight: "normal",
}

const BoxedPostMeta = styled(PostMeta)({
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "inline-block",
  padding: 16,
  borderRadius: 4,
  textAlign: "left",
})

const CoverImg = styled(GatsbyImage)({
  height: "100%",
  width: "100%",
})

const Titlescreen = ({ background, frontmatter, timeToRead }) => {
  const [scrollRatio, setScrollRatio] = useState(0)
  const updateParallax = () => {
    window.requestAnimationFrame(() => {
      const newScrollRatio = Math.max(
        0,
        Math.min(1, window.scrollY / window.innerHeight)
      )
      setScrollRatio(newScrollRatio)
    })
  }
  useEffect(() => {
    const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)
    if (!isMobileDevice) {
      updateParallax()
      window.addEventListener("scroll", updateParallax)
      window.addEventListener("resize", updateParallax)
    }
  }, [])

  return (
    <div
      css={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
        marginBottom: 32,
      }}
    >
      <CoverImg
        image={getImage(background)}
        imgStyle={{ transform: `translate(0, ${50 * scrollRatio}%)` }}
        loading="eager"
        alt=""
      />
      <div
        css={{
          position: "absolute",
          left: 0,
          bottom: "33%",
          width: "100%",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <h1 css={titleStyle}>{frontmatter.title}</h1>
        <BoxedPostMeta frontmatter={frontmatter} timeToRead={timeToRead} />
      </div>
      <FontAwesomeIcon
        icon={faChevronUp}
        style={{
          color: "rgba(0, 0, 0, 0.6)",
          fontSize: "6rem",
          position: "absolute",
          top: "75%",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      />
    </div>
  )
}

Titlescreen.propTypes = {
  background: PropTypes.object.isRequired,
  frontmatter: PropTypes.shape({
    date: PropTypes.string,
    title: PropTypes.string,
  }),
  timeToRead: PropTypes.number,
}

export default Titlescreen
