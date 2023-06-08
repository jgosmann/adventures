import GradeView from "./GradeView"

export default {
  title: "Post/Climbing Log/Grade/Grade View",
  component: GradeView,
}

export const Default = {
  args: {
    system: "UIAA",
    value: "5+",
  },
}

export const SystemWithUnderscore = {
  args: {
    system: "Fb_bloc",
    value: "6a+",
  },
}

export const VGrade = {
  args: {
    system: "V",
    value: "V3",
  },
}
