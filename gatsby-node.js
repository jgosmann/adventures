/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Mdx: {
      background: {
        type: `File`,
        resolve: (source, args, context) =>
          context.nodeModel.runQuery({
            type: `File`,
            firstOnly: true,
            query: {
              filter: {
                absolutePath: {
                  eq: `${path.dirname(source.fileAbsolutePath)}/images/${
                    source.frontmatter.background
                  }`,
                },
              },
            },
          }),
      },
      images: {
        type: `[File!]`,
        resolve: (source, args, context) =>
          context.nodeModel.runQuery({
            type: `File`,
            query: {
              filter: {
                absolutePath: {
                  glob: `${path.dirname(source.fileAbsolutePath)}/images/*`,
                },
              },
            },
          }),
      },
      panoramas: {
        type: `[File!]`,
        resolve: (source, args, context) =>
          context.nodeModel.runQuery({
            type: `File`,
            query: {
              filter: {
                absolutePath: {
                  glob: `${path.dirname(source.fileAbsolutePath)}/pano/*`,
                },
              },
            },
          }),
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
        allMdx {
          nodes {
            id
            parent {
              ... on File {
                relativeDirectory
              }
            }
          }
        }
      }
    `)
  ).data.allMdx.nodes.map(node => ({
    id: node.id,
    path: node.parent.relativeDirectory,
  }))

  posts.forEach(post =>
    createPage({
      path: `/posts/${post.path}`,
      component: postTemplate,
      context: {
        postId: post.id,
      },
    })
  )
}

exports.createPages = async args => {
  createYearlyIndices(args)
  createPostPages(args)
}
