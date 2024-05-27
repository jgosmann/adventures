import React from "react"
import { StoryFn } from "@storybook/react"

let nextStaticQueryResult: unknown

export const setStaticQuery = (data: unknown) => {
  nextStaticQueryResult = data
}

export const useStaticQuery = () => {
  return nextStaticQueryResult
}

export const decorator = (
  Story: StoryFn,
  { parameters }: { parameters: Record<string, unknown> }
) => {
  if (parameters && parameters.staticQuery) {
    nextStaticQueryResult = parameters.staticQuery
  }
  return <Story />
}
