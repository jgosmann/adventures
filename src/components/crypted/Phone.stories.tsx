import React from "react"
import { ComponentStory } from "@storybook/react"

import CryptedPhone, { CryptedPhoneProps } from "./Phone"

export default {
  title: "Crypted/Phone",
  component: CryptedPhone,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}

const Template: ComponentStory<typeof CryptedPhone> = (
  args: CryptedPhoneProps
) => <CryptedPhone {...args} />

export const Phone = Template.bind({})
Phone.args = {
  country: "+49",
  area: "174",
  block0: "123",
  block1: "4567",
  copyTitle: "Copy phone number",
}
