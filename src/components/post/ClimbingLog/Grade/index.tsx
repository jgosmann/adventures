import { useContext, useRef, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"

import {
  boulderingGrades,
  isBoulderingGrade,
  isSportGrade,
  sportGrades,
  gradeToString,
} from "./types"
import type { System, Grade as GradeType } from "./types"
import Selector from "./Selector"
import { createGradeConverter } from "./gradeConverter"
import GradeView from "./GradeView"
import conversionTable from "./climbing-grades.csv"
import { useBoulderingGradeSystem, useSportGradeSystem } from "./GradeContext"

let nextId = 0

export interface GradeProps {
  system: System | null
  value: string | null
}

interface GradeState {
  expanded: boolean
  xTranslation: number
  selectedSystem: System | null
  hasPendingUpdate: boolean
  firstRender: boolean
}

const Grade = ({ system, value }: GradeProps) => {
  const [state, setState] = useState<GradeState>({
    expanded: false,
    xTranslation: 0,
    selectedSystem: null,
    hasPendingUpdate: false,
    firstRender: true,
  })
  const [boulderingGradeSystem, setBoulderingGradeSystem] =
    useBoulderingGradeSystem()
  const [sportGradeSystem, setSportGradeSystem] = useSportGradeSystem()
  const updateDefaultSystem = ({ selectedSystem }: GradeState) => {
    if (
      isBoulderingGrade(system) &&
      (selectedSystem == null || isBoulderingGrade(selectedSystem))
    ) {
      setBoulderingGradeSystem(selectedSystem)
    } else if (
      isSportGrade(system) &&
      (selectedSystem == null || isSportGrade(selectedSystem))
    ) {
      setSportGradeSystem(selectedSystem)
    }
  }
  useEffect(() => {
    if (state.hasPendingUpdate) {
      setState(state => ({ ...state, hasPendingUpdate: false }))
      updateDefaultSystem(state)
    }
  }, [state])
  const ref = useRef<HTMLButtonElement>(null)
  const dropDownRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    setState(state => ({ ...state, firstRender: false }))
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
    const selectedSystem = isBoulderingGrade(system)
      ? boulderingGradeSystem
      : sportGradeSystem
    if (state.selectedSystem !== selectedSystem) {
      setState(state => ({
        ...state,
        selectedSystem,
      }))
    }
  }, [boulderingGradeSystem, sportGradeSystem])

  if (!system || !value) {
    return null
  }

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
    state.firstRender
      ? null
      : isBoulderingGrade(system)
      ? boulderingGradeSystem
      : sportGradeSystem
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
      />
    </button>
  )
}

export default Grade
