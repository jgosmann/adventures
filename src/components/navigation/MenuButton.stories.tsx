import React from "react"
import MenuButtonComponent from "./MenuButton"
import { minFullWidth } from "./sizes"

export default {
  title: "Navigation/Menu Button",
  component: MenuButtonComponent,
  parameters: {
    chromatic: { viewports: [minFullWidth - 1, minFullWidth + 1] },
  },
}

export const MenuButton = () => <MenuButtonComponent>Label</MenuButtonComponent>
