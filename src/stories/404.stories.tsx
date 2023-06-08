import NotFoundPage from "../pages/404"
import { staticQueryData } from "../../test/static-query-data"

export default {
  title: "Pages/Not Found",
  component: NotFoundPage,
  parameters: {
    layout: "fullscreen",
    staticQuery: staticQueryData,
  },
}

export const NotFound = {
  args: {
    location: {
      pathname: "/foo",
    },
  },
}
