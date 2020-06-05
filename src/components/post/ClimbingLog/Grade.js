import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext, useRef, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

const sportGrades = ["UIAA", "YDS", "french"]
const boulderingGrades = ["Fb_bloc", "Fb_trav", "V"]

const GradeContext = React.createContext({
  setDefaultGradeSystems: () => undefined,
  defaultBoulderingGradeSystem: null,
  defaultSportGradeSystem: null,
})

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

  return (
    <GradeContext.Provider value={{ ...state, setDefaultGradeSystems }}>
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
  })
  const gradeContext = useContext(GradeContext)
  const dropDownRef = useRef(null)
  useEffect(() => {
    const collapse = () =>
      setState(current => ({
        ...current,
        expanded: false,
      }))
    window.addEventListener("resize", collapse)
    return () => window.removeEventListener("resize", collapse)
  }, [])

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

  const relevantConversions =
    boulderingGrades.indexOf(system) >= 0 ? boulderingGrades : sportGrades
  const convertedGrades = relevantConversions
    .map(toSystem => convertGrade(value, system, toSystem))
    .filter(grade => !!grade)

  const defaultSystem =
    boulderingGrades.indexOf(system) >= 0
      ? gradeContext.defaultBoulderingGradeSystem
      : gradeContext.defaultSportGradeSystem
  const displayGrade = convertGrade(value, system, defaultSystem) || {
    value,
    system,
  }

  const defaultSystemChanged = ev => {
    const newSystem = ev.target.value
    const update =
      boulderingGrades.indexOf(newSystem) >= 0
        ? { defaultBoulderingGradeSystem: newSystem }
        : { defaultSportGradeSystem: newSystem }
    gradeContext.setDefaultGradeSystems(update)
  }

  return (
    <span
      title={convertedGrades.map(gradeToString).join("\n")}
      css={{
        position: "relative",
        cursor: "pointer",
        padding: 1,
        border: "1px solid rgba(0, 0, 0, 0)",
        borderRadius: 4,
        whiteSpace: "nowrap",
        outline: "none",
        "&:hover": {
          borderColor: "#888",
        },
        "&:focus-within": {
          borderColor: "#888",
        },
      }}
      tabIndex={0}
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
            xTranslation: translateXBy,
          }
        })
      }}
      onBlur={() => setState(current => ({ ...current, expanded: false }))}
    >
      {gradeToString(displayGrade)} <FontAwesomeIcon icon={faCaretDown} />
      <div
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
        }}
      >
        <div css={{ marginBottom: 8, padding: 2 }}>
          <input
            type="radio"
            name="system"
            value="null"
            checked={!defaultSystem || defaultSystem === "null"}
            onChange={defaultSystemChanged}
          />{" "}
          Show original grades
        </div>
        <div>
          {" "}
          Show grades as
          <table css={{ td: { padding: 2 } }}>
            <tbody>
              {convertedGrades.map(grade => (
                <tr key={grade.system}>
                  <td>
                    <input
                      type="radio"
                      name="system"
                      checked={defaultSystem === grade.system}
                      value={grade.system}
                      onChange={defaultSystemChanged}
                    />
                  </td>
                  <td>{grade.system}</td>
                  <td css={{ fontWeight: "bold" }}>{grade.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </span>
  )
}

Grade.propTypes = {
  system: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Grade
