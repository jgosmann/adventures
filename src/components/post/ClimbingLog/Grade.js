import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext, useRef, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

import colors from "../../../colors"

const sportGrades = ["UIAA", "YDS", "french"]
const boulderingGrades = ["Fb_bloc", "Fb_trav", "V"]

const GradeContext = React.createContext({
  setDefaultGradeSystems: () => undefined,
  defaultBoulderingGradeSystem: null,
  defaultSportGradeSystem: null,
})

let nextId = 0

export const LocalStorageGradeContext = ({ children }) => {
  const [state, setState] = useState({
    defaultBoulderingGradeSystem: null,
    defaultSportGradeSystem: null,
  })
  useEffect(() => {
    setState(state => ({
      ...state,
      defaultBoulderingGradeSystem:
        window && window.localStorage.getItem("defaultBoulderingGradeSystem"),
      defaultSportGradeSystem:
        window && window.localStorage.getItem("defaultSportGradeSystem"),
    }))
  }, [])

  const setDefaultGradeSystems = systems => {
    setState(systems)
    Object.entries(systems).forEach(([key, value]) => {
      try {
        if (window && value) {
          window.localStorage.setItem(key, systems[key])
        }
      } catch (err) {
        console.warn(`Failed to store ${key} in local storage.`)
      }
    })
  }

  const getDefaultSystem = system =>
    boulderingGrades.indexOf(system) >= 0
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

LocalStorageGradeContext.propTypes = {
  children: PropTypes.node,
}

const Grade = ({ system, value }) => {
  const [state, setState] = useState({
    expanded: false,
    xTranslation: 0,
    selectedSystem: null,
    hasPendingUpdate: false,
    id: nextId++,
  })
  const gradeContext = useContext(GradeContext)
  const updateDefaultSystem = state => {
    const update =
      boulderingGrades.indexOf(state.selectedSystem) >= 0
        ? { defaultBoulderingGradeSystem: state.selectedSystem }
        : { defaultSportGradeSystem: state.selectedSystem }
    gradeContext.setDefaultGradeSystems(update)
  }
  useEffect(() => {
    if (state.hasPendingUpdate) {
      setState({ ...state, hasPendingUpdate: false })
      updateDefaultSystem(state)
    }
  }, [state])
  const ref = useRef(null)
  const dropDownRef = useRef(null)
  useEffect(() => {
    const collapse = () =>
      setState(current => ({
        ...current,
        expanded: false,
      }))
    const onClick = ev => {
      if (ref.current.contains(ev.target)) return
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

  const conversionTable = useStaticQuery(graphql`
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

  const convertGrade = (value, fromSystem, toSystem) => {
    let index = conversionTable.findIndex(row => row[fromSystem] === value)
    for (; index >= 0 && !conversionTable[index][toSystem]; --index);
    if (index < 0) {
      return undefined
    }
    return { system: toSystem, value: conversionTable[index][toSystem] }
  }

  const gradeToString = ({ system, value }) => {
    if (system === "V") {
      return value
    } else {
      return `${system.replace("_", " ")} ${value}`
    }
  }

  const renderGrade = ({ system, value }) => {
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

  const relevantConversions =
    boulderingGrades.indexOf(system) >= 0 ? boulderingGrades : sportGrades
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

  const selectionChanged = ev => {
    const newSystem = ev.target.value
    setState(current => ({
      ...current,
      selectedSystem: newSystem,
    }))
  }

  return (
    <button
      ref={ref}
      title={convertedGrades.map(gradeToString).join("\n")}
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
      onClick={() => {
        setState(current => {
          const translateXBy = Math.abs(
            Math.min(
              0,
              dropDownRef.current.getBoundingClientRect().right -
                current.xTranslation -
                dropDownRef.current.clientWidth -
                2
            )
          )
          return {
            ...current,
            expanded: !current.expanded,
            hasPendingUpdate: current.expanded,
            xTranslation: translateXBy,
          }
        })
      }}
      onBlur={ev => {
        if (!ref.current.contains(ev.relatedTarget) && state.expanded) {
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
            checked={state.selectedSystem === "null"}
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
              {convertedGrades.map(grade => (
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
                    <label htmlFor={`gradeSelect-${state.id}-${grade.system}`}>
                      {grade.system.replace("_", " ")}
                    </label>
                  </td>
                  <td css={{ fontWeight: "bold" }}>
                    <label htmlFor={`gradeSelect-${state.id}-${grade.system}`}>
                      {grade.value}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </button>
  )
}

Grade.propTypes = {
  system: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Grade
