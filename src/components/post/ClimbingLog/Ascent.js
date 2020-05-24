import { graphql } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import Grade from "./Grade"
import Style from "./Style"

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

const Ascent = ({ data, pitch }) => {
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

Ascent.propTypes = {
  data: PropTypes.object.isRequired,
  pitch: PropTypes.number,
}

export default Ascent
