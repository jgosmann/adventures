import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const sportGrades = ["UIAA", "YDS", "french"]
const boulderingGrades = ["Fb_bloc", "Fb_trav", "V"]

const Grade = ({ system, value }) => {
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
      return { system: fromSystem, value }
    }
    return { system: toSystem, value: conversionTable[index][toSystem] }
  }

  const gradeToString = ({ system, value }) => {
    if (system === "V") {
      return value
    } else {
      return `${system} ${value}`
    }
  }

  const relevantConversions =
    boulderingGrades.indexOf(system) >= 0 ? boulderingGrades : sportGrades
  const title = relevantConversions
    .map(toSystem => gradeToString(convertGrade(value, system, toSystem)))
    .join("\n")

  return <span title={title}>({gradeToString({ system, value })})</span>
}

Grade.propTypes = {
  system: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default Grade
