import React from "react"
import { staticQueryData } from "../../../test/static-query-data"
import ConfirmPage from "../../pages/subscribe/confirm"

export default {
  title: "Pages/Subscribe/Confirm",
  component: ConfirmPage,
  parameters: {
    layout: "fullscreen",
    staticQuery: staticQueryData,
  },
}

export const Confirm = () => <ConfirmPage />
