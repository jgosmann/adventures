import { graphql, useStaticQuery } from "gatsby"
import React, { useContext, useRef, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

import colors from "../../../../colors"
import {
  boulderingGrades,
  isBoulderingGrade,
  isSportGrade,
  sportGrades,
  System,
  Grade as GradeType,
  gradeToString,
} from "./types"
import Selector from "./Selector"
import { createGradeConverter } from "./gradeConverter"
import GradeContext from "./GradeContext"
import GradeView from "./GradeView"

interface ConversionTable {
  allClimbingGradesCsv: {
    nodes: Array<{
      [k in System]: string
    }>
  }
}

let nextId = 0

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

  const convertGrade = createGradeConverter(conversionTable)

  const relevantConversions = isBoulderingGrade(system)
    ? boulderingGrades
    : sportGrades
  const convertedGrades = relevantConversions
    .map(toSystem => convertGrade(value, system, toSystem))
    .filter((grade): grade is GradeType => !!grade)

  const displayGrade = convertGrade(
    value,
    system,
    gradeContext.getDefaultSystem(system)
  ) || {
    value,
    system,
  }

  return (
    <button
      data-testid="grade"
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
        ev.stopPropagation()
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
        if (ev.code === "Escape" && state.expanded) {
          setState(current => ({
            ...current,
            expanded: false,
            hasPendingUpdate: true,
          }))
        }
      }}
    >
      <GradeView {...displayGrade} /> <FontAwesomeIcon icon={faCaretDown} />
      <Selector
        convertedGrades={convertedGrades}
        expanded={state.expanded}
        xTranslation={state.xTranslation}
        selectedSystem={state.selectedSystem}
        onSystemChange={selectedSystem =>
          setState(current => ({ ...current, selectedSystem }))
        }
        id={state.id}
      />
    </button>
  )
}

export default Grade

export { LocalStorageGradeContext } from "./GradeContext"
