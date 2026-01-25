import { boulderingGrades, sportGrades } from "./types"
import type { BoulderingGradeSystem, SportGradeSystem } from "./types"
import { atom, useAtom } from "jotai"

const initialBoulderingGradeSystem =
  typeof window !== "undefined" &&
  window.localStorage.getItem("defaultBoulderingGradeSystem")
const initialSportGradeSystem =
  typeof window !== "undefined" &&
  window.localStorage.getItem("defaultSportGradeSystem")

const defaultBoulderingGradeSystem = atom<BoulderingGradeSystem | null>(
  boulderingGrades.find(it => it === initialBoulderingGradeSystem) ?? null
)
const defaultSportGradeSystem = atom<SportGradeSystem | null>(
  sportGrades.find(it => it === initialSportGradeSystem) ?? null
)

export const useBoulderingGradeSystem = () => {
  const [state, setState] = useAtom(defaultBoulderingGradeSystem)

  const setGradeSystem = (system: BoulderingGradeSystem | null) => {
    setState(system)
    if (system === null) {
      window.localStorage.removeItem("defaultBoulderingGradeSystem")
    } else {
      window.localStorage.setItem("defaultBoulderingGradeSystem", system)
    }
  }

  return [state, setGradeSystem] as const
}

export const useSportGradeSystem = () => {
  if (typeof window === "undefined") {
    return [null, () => {}] as const
  }

  const [state, setState] = useAtom(defaultSportGradeSystem)

  const setGradeSystem = (system: SportGradeSystem | null) => {
    setState(system)
    if (system === null) {
      window.localStorage.removeItem("defaultSportGradeSystem")
    } else {
      window.localStorage.setItem("defaultSportGradeSystem", system)
    }
  }

  return [state, setGradeSystem] as const
}
