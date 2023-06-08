import PostMeta from "./PostMeta"

export default {
  title: "Controls/Post Meta",
  component: PostMeta,
}

export const AllSet = {
  args: {
    frontmatter: { date: "2022-07-17T11:19:42Z" },
    fields: { timeToRead: { minutes: 4 } },
  },
}

export const NoneSet = {
  args: { frontmatter: { date: null } },
}
