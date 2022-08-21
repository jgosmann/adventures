import React from "react"
import { staticQueryData } from "../../../test/static-query-data"
import UnsubscribePage from "."

export default {
  title: "Pages/Unsubscribe/Index",
  component: UnsubscribePage,
  parameters: {
    layout: "fullscreen",
    staticQuery: staticQueryData,
  },
}

export const Index = () => <UnsubscribePage />
