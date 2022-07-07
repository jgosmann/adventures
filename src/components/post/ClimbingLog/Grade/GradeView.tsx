import React from "react"
import colors from "../../../../colors"
import { Grade } from "./types"

const GradeView = ({ system, value }: Grade) => {
  if (system === "V") {
    return <>{value}</>
  } else {
    return (
      <>
        <span
          css={{
            backgroundColor: colors.accent,
            color: "#fff",
            borderRadius: 4,
            padding: "1px 2px 0",
            fontSize: "0.8em",
          }}
          data-testid="grade-system"
        >
          {system.replace("_", " ")}
        </span>{" "}
        {value}
      </>
    )
  }
}

export default GradeView
