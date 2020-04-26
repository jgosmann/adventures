import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Helmet } from "react-helmet"

import PostPreview from "../components/PostPreview.js"

import "normalize.css"

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: frontmatter___publishdate, order: DESC }) {
      nodes {
        background {
          childImageSharp {
            fixed(width: 300, height: 250) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
        frontmatter {
          categories
          date
          title
          draft
        }
        id
        timeToRead
      }
    }
  }
`

const listStyle = {
  margin: 0,
  padding: 0,

  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
}

const listItemStyle = {
  transition: "0.2s",
  display: "block",
  margin: 16,
  borderRadius: 16,
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
  overflow: "hidden",
  position: "relative",
  width: 300,
  maxWidth: "calc(100vw - 72px)",
  height: 250,
  maxHeight: "calc(100vh - 72px)",

  "&:hover": {
    transform: "translate(-2px, -2px)",
    boxShadow: "2px 3px 4px rgba(0, 0, 0, 0.5)",
  },
}

const IndexPage = ({
  data: {
    allMdx: { nodes },
  },
}) => (
  <>
    <Helmet>
      <style type="text/css">{`
        @font-face {
            font-family: 'Lato Light';
            src: url('fonts/LatoLatin-Light.woff2') format('woff2'),
                url('fonts/LatoLatin-Light.woff') format('woff');
            font-display: swap;
        }

        @font-face {
            font-family: 'Lato Light';
            src: url('fonts/LatoLatin-LightItalic.woff2') format('woff2'),
                url('fonts/LatoLatin-LightItalic.woff') format('woff');
            font-style: italic;
            font-display: swap;
        }

        @font-face {
            font-family: 'Lato Light';
            src: url('fonts/LatoLatin-Regular.woff2') format('woff2'),
                url('fonts/LatoLatin-Regular.woff') format('woff');
            font-weight: bold;
            font-display: swap;
        }

        body {
          font-family: "Lato Light", sans-serif;
        }
      `}</style>
    </Helmet>
    <ol css={listStyle}>
      {nodes.map(node => (
        <li key={node.id} css={listItemStyle}>
          <PostPreview
            title={node.frontmatter.title}
            fixedImage={node.background.childImageSharp.fixed}
            date={Date.parse(node.frontmatter.date)}
            minutesToRead={node.timeToRead}
            categories={node.frontmatter.categories}
          />
        </li>
      ))}
    </ol>
  </>
)

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage
