import React from "react"
import { Story } from "@storybook/react"

let nextStaticQueryResult: unknown

export const setStaticQuery = (data: unknown) => {
  nextStaticQueryResult = data
}

export const useStaticQuery = () => {
  return nextStaticQueryResult
}

export const decorator = (
  Story: Story,
  { parameters }: { parameters: Record<string, unknown> }
) => {
  if (parameters && parameters.staticQuery) {
    nextStaticQueryResult = parameters.staticQuery
  }
  return <Story />
}
