import { System } from "./types"

export type ConversionTable = Array<{
  [k in System]: string
}>

export const createGradeConverter = (conversionTable: ConversionTable) => {
  const convertGrade = (
    value: string,
    fromSystem: System,
    toSystem: System | null
  ) => {
    if (fromSystem === toSystem) {
      return { system: toSystem, value }
    }
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
  return convertGrade
}
