import React from "react"
import { staticQueryData } from "../../../test/static-query-data"
import SubscribePage from "../../pages/subscribe"

export default {
  title: "Pages/Subscribe/Index",
  component: SubscribePage,
  parameters: {
    layout: "fullscreen",
    staticQuery: staticQueryData,
  },
}

export const Index = () => <SubscribePage />
