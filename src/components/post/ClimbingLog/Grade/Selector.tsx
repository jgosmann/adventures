import React from "react"
import { Grade, isBoulderingGrade, isSportGrade, System } from "./types"

export interface SelectorProps {
  convertedGrades: Grade[]
  expanded: boolean
  xTranslation: number
  selectedSystem: System | null
  onSystemChange?: (system: System | null) => void
  id: number
}

const Selector = React.forwardRef<HTMLFormElement, SelectorProps>(
  function Selector(componentProps, ref) {
    const {
      convertedGrades,
      expanded,
      xTranslation,
      selectedSystem,
      onSystemChange,
      id,
    } = componentProps
    return (
      <form
        data-testid="grade-selector"
        ref={ref}
        css={{
          position: "absolute",
          top: -1,
          right: -1 - xTranslation,
          padding: 4,
          opacity: expanded ? 1 : 0,
          transform: `scale(${expanded ? 1 : 0})`,
          transformOrigin: "top right",
          pointerEvents: expanded ? undefined : "none",
          cursor: "default",
          background: "#fff",
          border: "1px solid #888",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
          borderRadius: 4,
          transition: "0.2s ease-out",
          whiteSpace: "nowrap",
          zIndex: 1,
          color: "#222",
          fontSize: "0.8em",
          lineHeight: 1.2,
        }}
        onClick={ev => ev.stopPropagation()}
      >
        <div css={{ marginBottom: 8, padding: 2 }}>
          <input
            tabIndex={expanded ? 0 : -1}
            id={`gradeSelect-${id}-null`}
            type="radio"
            name="system"
            value="null"
            checked={selectedSystem === null}
            onChange={onSystemChange && (() => onSystemChange(null))}
          />{" "}
          <label htmlFor={`gradeSelect-${id}-null`}>Show original grades</label>
        </div>
        <div>
          {" "}
          Show grades as
          <table css={{ td: { padding: "0 4px 0" } }}>
            <tbody>
              {convertedGrades.map(
                grade =>
                  grade && (
                    <tr key={grade.system}>
                      <td>
                        <input
                          tabIndex={expanded ? 0 : -1}
                          id={`gradeSelect-${id}-${grade.system}`}
                          type="radio"
                          name="system"
                          checked={selectedSystem === grade.system}
                          value={grade.system}
                          onChange={
                            onSystemChange &&
                            (ev => {
                              const newSystem = ev.target.value
                              if (
                                isBoulderingGrade(newSystem) ||
                                isSportGrade(newSystem)
                              ) {
                                onSystemChange(newSystem)
                              }
                            })
                          }
                        />
                      </td>
                      <td>
                        <label htmlFor={`gradeSelect-${id}-${grade.system}`}>
                          {grade.system.replace("_", " ")}
                        </label>
                      </td>
                      <td css={{ fontWeight: "bold" }}>
                        <label htmlFor={`gradeSelect-${id}-${grade.system}`}>
                          {grade.value}
                        </label>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </form>
    )
  }
)

export default Selector
