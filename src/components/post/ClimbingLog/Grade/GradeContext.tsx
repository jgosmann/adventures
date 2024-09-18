import React, { useEffect, useState } from "react"
import {
  boulderingGrades,
  BoulderingGradeSystem,
  isBoulderingGrade,
  sportGrades,
  SportGradeSystem,
  System,
} from "./types"

export interface DefaultGradeSystems {
  defaultBoulderingGradeSystem: BoulderingGradeSystem | null
  defaultSportGradeSystem: SportGradeSystem | null
}

export interface GradeContextValue extends DefaultGradeSystems {
  getDefaultSystem: (system: string | null) => System | null
  setDefaultGradeSystems: (systems: Partial<DefaultGradeSystems>) => void
}

const GradeContext = React.createContext<GradeContextValue>({
  setDefaultGradeSystems: () => undefined,
  getDefaultSystem: () => null,
  defaultBoulderingGradeSystem: null,
  defaultSportGradeSystem: null,
})

export default GradeContext

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
      } catch {
        console.warn(`Failed to store ${key} in local storage.`)
      }
    })
  }

  const getDefaultSystem = (system: string | null) =>
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
