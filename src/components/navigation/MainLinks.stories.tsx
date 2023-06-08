import MainLinks from "./MainLinks"
import { minFullWidth } from "./sizes"

export default {
  title: "Navigation/Main Links",
  component: MainLinks,
  parameters: {
    chromatic: { viewports: [minFullWidth - 1, minFullWidth + 1] },
    staticQuery: {
      allSitePage: {
        nodes: [
          { path: "/year/2020", context: { year: 2020 } },
          { path: "/year/2021", context: { year: 2021 } },
          { path: "/year/2022", context: { year: 2022 } },
        ],
      },
    },
  },
}

export const Default = {}

export const ColumnOrientation = {
  args: {
    orientation: "column",
  },
}

export const WithQuery = {
  args: {
    query: "query",
  },
}

export const WithYearPath = {
  args: {
    path: "/year/2021",
  },
}
