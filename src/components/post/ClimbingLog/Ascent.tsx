import { graphql } from "gatsby"
import React from "react"

import Grade, { GradeProps } from "./Grade"
import Style, { AscenionStyle } from "./Style"

export const dataFragment = graphql`
  fragment Ascent_data on ClimbsYamlAscents {
    name
    grade {
      system
      value
    }
    pitches {
      name
      grade {
        system
        value
      }
      style
    }
    style
  }
`

export interface Pitch {
  name?: string
  style?: AscenionStyle
  grade?: GradeProps
}

export interface Route extends Pitch {
  pitches?: Pitch[]
}

export interface AscentProps {
  data: Route
  pitch?: number
}

const Ascent = ({ data, pitch }: AscentProps) => {
  return (
    <span
      css={
        data.style === "skipped" || data.style === "not attempted"
          ? { color: "#aaa" }
          : {}
      }
    >
      {data.style && (
        <>
          <Style ascensionStyle={data.style} />{" "}
        </>
      )}
      {pitch && `Pitch ${pitch}`}
      {pitch && data.name && ": "}
      {data.name}
      {data.grade && (
        <>
          {" "}
          (<Grade {...data.grade} />)
        </>
      )}
      {data.pitches && (
        <>
          {" "}
          ({data.pitches.length} pitches)
          <ol>
            {data.pitches.map((pitch, i) => (
              <li key={i}>
                <Ascent data={pitch} pitch={i + 1} />
              </li>
            ))}
          </ol>
        </>
      )}
    </span>
  )
}

export default Ascent
