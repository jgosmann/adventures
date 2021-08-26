import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { primaryShadedButton } from "../../styles"

const Nextday = ({ path }) =>
  path && (
    <p css={{ textAlign: "right" }}>
      <Link to={path} css={primaryShadedButton}>
        Next day <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </p>
  )

Nextday.propTypes = {
  path: PropTypes.string.isRequired,
}

export default Nextday
