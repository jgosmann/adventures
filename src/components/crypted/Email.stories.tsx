import React from "react"
import { ComponentStory } from "@storybook/react"

import CryptedEmail, { CryptedEmailProps } from "./Email"

export default {
  title: "Crypted/Email",
  component: CryptedEmail,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}

const Template: ComponentStory<typeof CryptedEmail> = (
  args: CryptedEmailProps
) => <CryptedEmail {...args} />

export const Email = Template.bind({})
Email.args = {
  name: "name",
  domain: "domain",
  tld: "tld",
  writeEmailTitle: "Write email",
  copyTitle: "Copy email address",
}
