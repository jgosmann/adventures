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
    },
    File: {
      pagePath: {
        type: `String!`,
        resolve: source => {
          const parts = source.name.split(".")
          const name = parts.length > 1 ? parts.slice(0, -1).join("") : parts[0]
          const lang = parts.length > 1 ? "/" + parts[parts.length - 1] : ""
          return `${lang}/${source.sourceInstanceName}/${
            source.relativeDirectory
          }${name === "index" ? "" : name}`
        },
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
        allFile(
          filter: { sourceInstanceName: { eq: "posts" }, ext: { eq: ".mdx" } }
          sort: { fields: childMdx___frontmatter___date, order: DESC }
        ) {
          nodes {
            childMdx {
              id
              frontmatter {
                date
              }
            }
          }
        }
      }
    `)
  ).data.allFile.nodes.map(post => ({
    id: post.childMdx.id,
    date: new Date(post.childMdx.frontmatter.date),
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
      {
        allFile(
          filter: { sourceInstanceName: { eq: "posts" }, ext: { eq: ".mdx" } }
          sort: { fields: childMdx___frontmatter___date, order: ASC }
        ) {
          edges {
            node {
              pagePath
              childMdx {
                id
              }
            }
            next {
              pagePath
            }
          }
        }
      }
    `)
  ).data.allFile.edges

  posts.forEach(post =>
    createPage({
      path: post.node.pagePath,
      component: postTemplate,
      context: {
        postId: post.node.childMdx.id,
        nextPath: post.next ? post.next.pagePath : null,
      },
    })
  )
}

const createLegalPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const legalTemplate = path.resolve("src/templates/legal.js")

  const legalPages = (
    await graphql(`
      {
        allFile(
          filter: { ext: { eq: ".mdx" }, sourceInstanceName: { eq: "legal" } }
        ) {
          nodes {
            pagePath
            childMdx {
              id
            }
          }
        }
      }
    `)
  ).data.allFile.nodes

  legalPages.forEach(page =>
    createPage({
      path: page.pagePath,
      component: legalTemplate,
      context: {
        pageId: page.childMdx.id,
      },
    })
  )
}

exports.createPages = async args => {
  createYearlyIndices(args)
  createPostPages(args)
  createLegalPages(args)
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-leaflet-geodesic/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
