import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"
import React from "react"

import { primaryShadedButton } from "../../styles"

export interface NextdayProps {
  path?: string
}

const Nextday = ({ path }: NextdayProps) =>
  path ? (
    <p css={{ textAlign: "right" }}>
      <Link to={path} css={primaryShadedButton}>
        Next day <FontAwesomeIcon icon={faChevronRight} />
      </Link>
    </p>
  ) : (
    <></>
  )

export default Nextday
