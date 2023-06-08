import { YearSelectorView } from "./YearSelector"

export default {
  title: "Navigation/Year Selector",
  component: YearSelectorView,
  parameters: {
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

export const Closed = {}

export const Open = {
  args: {
    active: true,
  },
}

export const SelectedYear = {
  args: {
    path: "/year/2021",
  },
}
