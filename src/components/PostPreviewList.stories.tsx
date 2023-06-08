import PostPreviewListComponent from "./PostPreviewList"
import { postPreview } from "../../test/post-preview-fixture"

export default {
  title: "Controls/Post Preview List",
  component: PostPreviewListComponent,
  paramaters: {
    chromatic: { disableSnapshot: true },
  },
}

export const PostPreviewList = {
  args: {
    nodes: [postPreview(0), postPreview(1)],
  },
}
