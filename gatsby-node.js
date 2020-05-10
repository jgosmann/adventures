/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

const resolveSinglePostFile = relativeDirectory => (source, args, context) => {
  const evaluatedDirectory =
    relativeDirectory instanceof Function
      ? relativeDirectory(source, args, context)
      : relativeDirectory
  return context.nodeModel.runQuery({
    type: `File`,
    firstOnly: true,
    query: {
      filter: {
        absolutePath: {
          eq: `${path.dirname(source.fileAbsolutePath)}/${evaluatedDirectory}`,
        },
      },
    },
  })
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Mdx: {
      background: {
        type: `File`,
        resolve: resolveSinglePostFile(
          source => `images/${source.frontmatter.background}`
        ),
      },
      resources: {
        type: `[File!]!`,
        args: {
          filter: `FileFilterInput`,
          limit: `Int`,
          skip: `Int`,
          sort: `FileSortInput`,
        },
        resolve: async (source, args, context) => {
          const pathPrefix = path.basename(
            path.dirname(source.fileAbsolutePath)
          )
          const relativePathFilters =
            (args.filter && args.filter.relativePath) || {}
          return (
            (await context.nodeModel.runQuery({
              type: `File`,
              query: {
                ...args,
                filter: {
                  ...args.filter,
                  relativePath: Object.assign(
                    { glob: `${pathPrefix}/**` },
                    ...Object.entries(relativePathFilters).map(([k, v]) => ({
                      [k]: `${pathPrefix}/${v}`,
                    }))
                  ),
                  sourceInstanceName: { eq: "posts" },
                },
              },
            })) || []
          )
        },
      },
      path: {
        type: `String!`,
        resolve: async (source, args, context) =>
          "/posts/" +
          (
            await context.nodeModel.runQuery({
              type: `File`,
              firstOnly: true,
              query: {
                filter: {
                  absolutePath: { eq: source.fileAbsolutePath },
                },
              },
            })
          ).relativeDirectory,
      },
    },
  })
}

const createYearlyIndices = async ({ actions, graphql }) => {
  const { createPage } = actions

  const postListTemplate = path.resolve("src/pages/index.js")

  const posts = (
    await graphql(`
      query {
        allMdx(sort: { fields: frontmatter___date, order: DESC }) {
          nodes {
            id
            frontmatter {
              date
            }
          }
        }
      }
    `)
  ).data.allMdx.nodes.map(post => ({
    id: post.id,
    date: new Date(post.frontmatter.date),
  }))

  let start = 0
  while (start < posts.length) {
    const year = posts[start].date.getFullYear()
    let end = start + 1
    for (; end < posts.length && year == posts[end].date.getFullYear(); ++end);
    createPage({
      path: `/year/${year}`,
      component: postListTemplate,
      context: {
        postIds: posts.slice(start, end).map(post => post.id),
        year,
      },
    })
    start = end
  }
}

const createPostPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const postTemplate = path.resolve("src/templates/post.js")

  const posts = (
    await graphql(`
      query {
        allMdx(sort: { fields: frontmatter___date, order: ASC }) {
          edges {
            node {
              id
              path
            }
            next {
              path
            }
          }
        }
      }
    `)
  ).data.allMdx.edges

  posts.forEach(post =>
    createPage({
      path: post.node.path,
      component: postTemplate,
      context: {
        postId: post.node.id,
        nextPath: post.next ? post.next.path : null,
      },
    })
  )
}

exports.createPages = async args => {
  createYearlyIndices(args)
  createPostPages(args)
}
