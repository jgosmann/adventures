import PropTypes from "prop-types"
import React from "react"

const Grade = ({ system, value }) => {
  if (system == "V") {
    return <>({value})</>
  } else {
    return (
      <>
        ({system} {value})
      </>
    )
  }
}

Grade.propTypes = {
  system: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Grade
