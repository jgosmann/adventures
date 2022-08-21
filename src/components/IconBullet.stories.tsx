import React from "react"
import { ComponentStory } from "@storybook/react"
import IconBulletComponent, { IconBulletProps } from "./IconBullet"
import { faMagic } from "@fortawesome/free-solid-svg-icons"

export default {
  title: "Controls/Icon Bullet",
  component: IconBulletComponent,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}

const Template: ComponentStory<typeof IconBulletComponent> = (
  args: IconBulletProps
) => <IconBulletComponent {...args} />

export const IconBullet = Template.bind({})
IconBullet.args = {
  icon: faMagic,
  children:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
}
