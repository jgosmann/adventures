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
    },
  })
}
