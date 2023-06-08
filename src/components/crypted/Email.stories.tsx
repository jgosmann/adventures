import CryptedEmail from "./Email"

export default {
  title: "Crypted/Email",
  component: CryptedEmail,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}

export const Email = {
  args: {
    name: "name",
    domain: "domain",
    tld: "tld",
    writeEmailTitle: "Write email",
    copyTitle: "Copy email address",
  },
}
