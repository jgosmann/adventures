import { graphql, useStaticQuery } from "gatsby"
import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  ChangeEventHandler,
} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

import colors from "../../../colors"

const sportGrades = ["UIAA", "YDS", "french"] as const
const boulderingGrades = ["Fb_bloc", "Fb_trav", "V"] as const

type SportGradeSystem = typeof sportGrades[number]
type BoulderingGradeSystem = typeof boulderingGrades[number]
type System = SportGradeSystem | BoulderingGradeSystem

const isSportGrade = (system: string | null): system is SportGradeSystem => {
  return !!sportGrades.find(it => it === system)
}

const isBoulderingGrade = (
  system: string | null
): system is BoulderingGradeSystem => {
  return !!boulderingGrades.find(it => it === system)
}

interface ConversionTable {
  allClimbingGradesCsv: {
    nodes: Array<{
      [k in System]: string
    }>
  }
}

interface DefaultGradeSystems {
  defaultBoulderingGradeSystem: BoulderingGradeSystem | null
  defaultSportGradeSystem: SportGradeSystem | null
}

interface GradeContextValue extends DefaultGradeSystems {
  getDefaultSystem: (system: System) => System | null
  setDefaultGradeSystems: (systems: Partial<DefaultGradeSystems>) => void
}

const GradeContext = React.createContext<GradeContextValue>({
  setDefaultGradeSystems: () => undefined,
  getDefaultSystem: () => null,
  defaultBoulderingGradeSystem: null,
  defaultSportGradeSystem: null,
})

let nextId = 0

export interface LocalStorageGradeContextProps {
  children?: React.ReactNode
}

export const LocalStorageGradeContext = ({
  children,
}: LocalStorageGradeContextProps) => {
  const [state, setState] = useState<DefaultGradeSystems>({
    defaultBoulderingGradeSystem: null,
    defaultSportGradeSystem: null,
  })
  useEffect(() => {
    setState(state => ({
      ...state,
      defaultBoulderingGradeSystem:
        (window &&
          boulderingGrades.find(
            it =>
              it === window.localStorage.getItem("defaultBoulderingGradeSystem")
          )) ||
        null,
      defaultSportGradeSystem:
        (window &&
          sportGrades.find(
            it => it === window.localStorage.getItem("defaultSportGradeSystem")
          )) ||
        null,
    }))
  }, [])

  const setDefaultGradeSystems = (systems: Partial<DefaultGradeSystems>) => {
    setState({
      defaultBoulderingGradeSystem:
        systems.defaultBoulderingGradeSystem ?? null,
      defaultSportGradeSystem: systems.defaultSportGradeSystem ?? null,
    })
    Object.entries(systems).forEach(([key, value]) => {
      try {
        if (window && value) {
          window.localStorage.setItem(key, value)
        }
      } catch (err) {
        console.warn(`Failed to store ${key} in local storage.`)
      }
    })
  }

  const getDefaultSystem = (system: string) =>
    isBoulderingGrade(system)
      ? state.defaultBoulderingGradeSystem
      : state.defaultSportGradeSystem

  return (
    <GradeContext.Provider
      value={{ ...state, getDefaultSystem, setDefaultGradeSystems }}
    >
      {children}
    </GradeContext.Provider>
  )
}

export interface GradeProps {
  system: System
  value: string
}

interface GradeState {
  expanded: boolean
  xTranslation: number
  selectedSystem: System | null
  hasPendingUpdate: boolean
  id: number
}

const Grade = ({ system, value }: GradeProps) => {
  const [state, setState] = useState<GradeState>({
    expanded: false,
    xTranslation: 0,
    selectedSystem: null,
    hasPendingUpdate: false,
    id: nextId++,
  })
  const gradeContext = useContext(GradeContext)
  const updateDefaultSystem = (state: GradeState) => {
    const update =
      state.selectedSystem && isBoulderingGrade(state.selectedSystem)
        ? { defaultBoulderingGradeSystem: state.selectedSystem }
        : isSportGrade(state.selectedSystem)
        ? { defaultSportGradeSystem: state.selectedSystem }
        : {}
    gradeContext.setDefaultGradeSystems(update)
  }
  useEffect(() => {
    if (state.hasPendingUpdate) {
      setState({ ...state, hasPendingUpdate: false })
      updateDefaultSystem(state)
    }
  }, [state])
  const ref = useRef<HTMLButtonElement>(null)
  const dropDownRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    const collapse = () =>
      setState(current => ({
        ...current,
        expanded: false,
      }))
    const onClick = (ev: MouseEvent) => {
      if (
        ev.target instanceof HTMLButtonElement &&
        ref.current?.contains(ev.target)
      )
        return
      setState(current => {
        return {
          ...current,
          expanded: false,
          hasPendingUpdate: current.expanded,
        }
      })
    }
    window.addEventListener("resize", collapse)
    window.addEventListener("click", onClick)
    return () => {
      window.removeEventListener("resize", collapse)
      window.removeEventListener("click", onClick)
    }
  }, [])
  useEffect(() => {
    const selectedSystem = gradeContext.getDefaultSystem(system)
    if (state.selectedSystem !== selectedSystem) {
      setState({
        ...state,
        selectedSystem: gradeContext.getDefaultSystem(system),
      })
    }
  }, [gradeContext])

  const conversionTable = useStaticQuery<ConversionTable>(graphql`
    query {
      allClimbingGradesCsv {
        nodes {
          Fb_bloc
          Fb_trav
          UIAA
          V
          YDS
          french
        }
      }
    }
  `).allClimbingGradesCsv.nodes

  const convertGrade = (
    value: string,
    fromSystem: System,
    toSystem: System | null
  ) => {
    if (toSystem === null) {
      return undefined
    }
    let index = conversionTable.findIndex(row => row[fromSystem] === value)
    for (; index >= 0 && !conversionTable[index][toSystem]; --index);
    if (index < 0) {
      return undefined
    }
    return { system: toSystem, value: conversionTable[index][toSystem] }
  }

  const gradeToString = ({
    system,
    value,
  }: {
    system: System
    value: string
  }) => {
    if (system === "V") {
      return value
    } else {
      return `${system.replace("_", " ")} ${value}`
    }
  }

  const renderGrade = ({
    system,
    value,
  }: {
    system: System
    value: string
  }) => {
    if (system === "V") {
      return value
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
          >
            {system.replace("_", " ")}
          </span>{" "}
          {value}
        </>
      )
    }
  }

  const relevantConversions = isBoulderingGrade(system)
    ? boulderingGrades
    : sportGrades
  const convertedGrades = relevantConversions
    .map(toSystem => convertGrade(value, system, toSystem))
    .filter(grade => !!grade)

  const displayGrade = convertGrade(
    value,
    system,
    gradeContext.getDefaultSystem(system)
  ) || {
    value,
    system,
  }

  const selectionChanged: ChangeEventHandler<HTMLInputElement> = ev => {
    const newSystem = ev.target.value === "null" ? null : ev.target.value
    if (
      isBoulderingGrade(newSystem) ||
      isSportGrade(newSystem) ||
      newSystem === null
    ) {
      setState(current => ({
        ...current,
        selectedSystem: newSystem,
      }))
    }
  }

  return (
    <button
      ref={ref}
      title={convertedGrades.map(it => it && gradeToString(it)).join("\n")}
      className="climbingGrade"
      css={{
        position: "relative",
        cursor: "pointer",
        padding: "0 0 1px",
        color: "inherit",
        lineHeight: 0,
        textAlign: "left",
        display: "inline-block",
        background: "none",
        transition: "0.2s ease-out",
        border: "none",
        borderRadius: 4,
        whiteSpace: "nowrap",
        outline: "none",
        "&:hover": {
          backgroundColor: colors.accent,
          color: "#fff",
        },
        "&:focus-within": {
          backgroundColor: colors.accent,
          color: "#fff",
        },
      }}
      onClick={ev => {
        ev.preventDefault()
        setState(current => {
          const translateXBy = dropDownRef.current
            ? Math.abs(
                Math.min(
                  0,
                  dropDownRef.current.getBoundingClientRect().right -
                    current.xTranslation -
                    dropDownRef.current.clientWidth -
                    2
                )
              )
            : 0
          return {
            ...current,
            expanded: !current.expanded,
            hasPendingUpdate: current.expanded,
            xTranslation: translateXBy,
          }
        })
      }}
      onBlur={ev => {
        if (!ref.current?.contains(ev.relatedTarget) && state.expanded) {
          setState(current => ({
            ...current,
            expanded: false,
            hasPendingUpdate: true,
          }))
        }
      }}
      onKeyDown={ev => {
        const escKeyCode = 27
        if (ev.keyCode == escKeyCode && state.expanded) {
          setState(current => ({
            ...current,
            expanded: false,
            hasPendingUpdate: true,
          }))
        }
      }}
    >
      {renderGrade(displayGrade)} <FontAwesomeIcon icon={faCaretDown} />
      <form
        ref={dropDownRef}
        css={{
          position: "absolute",
          top: -1,
          right: -1 - state.xTranslation,
          padding: 4,
          opacity: state.expanded ? 1 : 0,
          transform: `scale(${state.expanded ? 1 : 0})`,
          transformOrigin: "top right",
          pointerEvents: state.expanded ? undefined : "none",
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
            tabIndex={state.expanded ? 0 : -1}
            id={`gradeSelect-${state.id}-null`}
            type="radio"
            name="system"
            value="null"
            checked={state.selectedSystem === null}
            onChange={selectionChanged}
          />{" "}
          <label htmlFor={`gradeSelect-${state.id}-null`}>
            Show original grades
          </label>
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
                          tabIndex={state.expanded ? 0 : -1}
                          id={`gradeSelect-${state.id}-${grade.system}`}
                          type="radio"
                          name="system"
                          checked={state.selectedSystem === grade.system}
                          value={grade.system}
                          onChange={selectionChanged}
                        />
                      </td>
                      <td>
                        <label
                          htmlFor={`gradeSelect-${state.id}-${grade.system}`}
                        >
                          {grade.system.replace("_", " ")}
                        </label>
                      </td>
                      <td css={{ fontWeight: "bold" }}>
                        <label
                          htmlFor={`gradeSelect-${state.id}-${grade.system}`}
                        >
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
    </button>
  )
}

export default Grade
