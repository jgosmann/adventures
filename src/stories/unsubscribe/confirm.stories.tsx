import React from "react"
import { staticQueryData } from "../../../test/static-query-data"
import ConfirmPage from "../../pages/unsubscribe/confirm"

export default {
  title: "Pages/Unsubscribe/Confirm",
  component: ConfirmPage,
  parameters: {
    layout: "fullscreen",
    staticQuery: staticQueryData,
  },
}

export const Confirm = () => <ConfirmPage />
