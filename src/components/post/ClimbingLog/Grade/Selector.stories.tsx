import Selector from "./Selector"

export default {
  title: "Post/Climbing Log/Grade/Selector",
  component: Selector,
}

export const Default = {
  args: {
    convertedGrades: [
      { system: "UIAA", value: "5" },
      { system: "YDS", value: "5.6" },
    ],
    expanded: true,
    xTranslation: 0,
    selectedSystem: null,
    id: 0,
  },
}

export const UiaaSelected = {
  args: {
    ...Default.args,
    selectedSystem: "UIAA",
  },
}

export const Hidden = {
  args: {
    ...Default.args,
    expanded: false,
  },
}
