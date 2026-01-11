import React, { useId } from "react"
import { isBoulderingGrade, isSportGrade } from "./types"
import type { Grade, System } from "./types"

export interface SelectorProps {
  convertedGrades: Grade[]
  expanded: boolean
  xTranslation: number
  selectedSystem: System | null
  onSystemChange?: (system: System | null) => void
}

const Selector = React.forwardRef<HTMLFormElement, SelectorProps>(
  function Selector(componentProps, ref) {
    const {
      convertedGrades,
      expanded,
      xTranslation,
      selectedSystem,
      onSystemChange,
    } = componentProps
    const id = useId()
    return (
      <form
        data-testid="grade-selector"
        ref={ref}
        className={(expanded ? "expanded " : "") + "grade-selector"}
        style={
          { "--x-translation": `${xTranslation}px` } as React.CSSProperties
        }
        onClick={ev => ev.stopPropagation()}
      >
        <div>
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
          <table>
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
                      <td className="grade-value-cell">
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
