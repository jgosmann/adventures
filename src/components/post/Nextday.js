import { css } from "@emotion/core"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const mainColor = "rgb(51, 108, 198)"
const shade = "rgb(31, 59, 105)"
const highlight = "rgb(67, 124, 214)"

const ShadedButton = css`
  background-color: ${mainColor};
  background: linear-gradient(180deg, ${mainColor} 60%, ${shade} 100%);
  border: none;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
  transition: 0.2s;
  cursor: pointer;
  display: inline-block;

  margin-left: 8px;
  margin-right: 8px;

  &:hover {
    background-color: $highlight;
    background: linear-gradient(180deg, ${highlight} 60%, ${shade} 100%);
  }

  &:active {
    transition: 0s;
    background: ${mainColor};
  }

  color: #fff;
  text-decoration: none;

  &:hover {
    color: #fff;
  }
`

const Nextday = ({ path }) => (
  <p css={{ textAlign: "right" }}>
    <Link to={path} css={ShadedButton}>
      Next day <FontAwesomeIcon icon={faChevronRight} />
    </Link>
  </p>
)

Nextday.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Nextday
