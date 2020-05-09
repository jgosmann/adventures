import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Ascent from "./Ascent"

export const dataFragment = graphql`
  fragment ClimbingLog_data on ClimbsYaml {
    ascents {
      ...Ascent_data
    }
  }
`

const ClimbingLog = ({ climbs }) => (
  <>
    <h2>Climbing log book</h2>
    <ol>
      {climbs.ascents.map((ascent, i) => (
        <li key={i}>
          <Ascent data={ascent} />
        </li>
      ))}
    </ol>
  </>
)

ClimbingLog.propTypes = {
  climbs: PropTypes.object.isRequired,
}

export default ClimbingLog
