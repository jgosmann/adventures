export const sportGrades = ["UIAA", "YDS", "french"] as const
export const boulderingGrades = ["Fb_bloc", "Fb_trav", "V"] as const

export type SportGradeSystem = (typeof sportGrades)[number]
export type BoulderingGradeSystem = (typeof boulderingGrades)[number]
export type System = SportGradeSystem | BoulderingGradeSystem

export const isSportGrade = (
  system: string | null
): system is SportGradeSystem => {
  return !!sportGrades.find(it => it === system)
}

export const isBoulderingGrade = (
  system: string | null
): system is BoulderingGradeSystem => {
  return !!boulderingGrades.find(it => it === system)
}

export const isGradingSystem = (system: string | null): system is System => {
  return isBoulderingGrade(system) || isSportGrade(system)
}

export interface Grade {
  system: System
  value: string
}

export const gradeToString = ({ system, value }: Grade) => {
  if (system === "V") {
    return `${value}`
  } else {
    return `${system.replace("_", " ")} ${value}`
  }
}
