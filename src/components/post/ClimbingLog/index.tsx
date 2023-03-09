import { graphql } from "gatsby"
import React from "react"

import Ascent, { Pitch } from "./Ascent"
import { isGradingSystem } from "./Grade/types"
import { isAscensionStyle } from "./Style"

export const dataFragment = graphql`
  fragment ClimbingLog_data on ClimbsYaml {
    ascents {
      ...Ascent_data
    }
  }
`

type InputPitch = NonNullable<
  NonNullable<
    NonNullable<Queries.ClimbingLog_dataFragment["ascents"]>[number]
  >["pitches"]
>[number]
const isValidPitch = (pitch: InputPitch): pitch is Pitch => {
  return (
    (!pitch?.style || isAscensionStyle(pitch.style)) &&
    (!pitch?.grade || isGradingSystem(pitch.grade.system))
  )
}

export interface ClimbingLogProps {
  climbs: Queries.ClimbingLog_dataFragment
}

const ClimbingLog = ({ climbs }: ClimbingLogProps) => (
  <>
    <h2>Climbing log book</h2>
    <ol>
      {climbs.ascents?.map(
        (ascent, i) =>
          ascent &&
          isValidPitch(ascent) && (
            <li key={i}>
              <Ascent
                data={{
                  ...ascent,
                  pitches: ascent.pitches?.filter(isValidPitch) ?? undefined,
                }}
              />
            </li>
          )
      )}
    </ol>
  </>
)

export default ClimbingLog
