import ExpandedMenu from "./ExpandedMenu"

export default {
  title: "Navigation/Expanded Menu",
  component: ExpandedMenu,
  parameters: {
    layout: "fullscreen",
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

export const Expanded = {
  args: {
    expanded: true,
  },
}
