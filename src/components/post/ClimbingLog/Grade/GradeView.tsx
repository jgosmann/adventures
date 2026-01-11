import type { Grade } from "./types"

const GradeView = ({ system, value }: Grade) => {
  if (system === "V") {
    return <>{value}</>
  } else {
    return (
      <>
        <span className="grade-system" data-testid="grade-system">
          {system.replace("_", " ")}
        </span>{" "}
        {value}
      </>
    )
  }
}

export default GradeView
