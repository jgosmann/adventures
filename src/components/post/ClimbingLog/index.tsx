import { graphql } from "gatsby"
import React from "react"

import Ascent, { Route } from "./Ascent"

export const dataFragment = graphql`
  fragment ClimbingLog_data on ClimbsYaml {
    ascents {
      ...Ascent_data
    }
  }
`

export interface ClimbingLogProps {
  climbs: {
    ascents: Route[]
  }
}

const ClimbingLog = ({ climbs }: ClimbingLogProps) => (
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

export default ClimbingLog
