import CryptedPhone from "./Phone"

export default {
  title: "Crypted/Phone",
  component: CryptedPhone,
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}

export const Phone = {
  args: {
    country: "+49",
    area: "174",
    block0: "123",
    block1: "4567",
    copyTitle: "Copy phone number",
  },
}
