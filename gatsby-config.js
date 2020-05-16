module.exports = {
  siteMetadata: {
    title: `Jan's outdoor adventures`,
    description: `Jan's blog about adventures experienced outdoors and while travelling.`,
    author: `@jgosmann`,
    siteUrl: `https://adventures.jgosmann.de`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ["node_modules"],
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `legal`,
        path: `${__dirname}/content/legal/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `leaflet`,
        path: `${__dirname}/node_modules/leaflet/dist/`,
      },
    },
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            output: "/index.xml",
            title: "Jan's outdoor adventures",
            query: `
              {
                allFile(
                  filter: { sourceInstanceName: { eq: "posts" }, ext: { eq: ".mdx" } }
                  sort: {fields: childMdx___frontmatter___date, order: DESC}
                ) {
                  nodes {
                    pagePath
                    childMdx {
                      excerpt(pruneLength: 500)
                      frontmatter {
                        date
                        map
                        title
                      }
                      background {
                        childImageSharp {
                          resize(width: 800) {
                            src
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            custom_namespaces: {
              og: "http://ogp.me/ns#",
            },
            serialize: ({ query: { site, allFile } }) =>
              allFile.nodes.map(node => {
                const latLong = JSON.parse(`[${node.childMdx.frontmatter.map}]`)
                return {
                  ...node.childMdx.frontmatter,
                  url: site.siteMetadata.siteUrl + node.pagePath + "/",
                  description: node.childMdx.excerpt,
                  lat: latLong[0],
                  long: latLong[1],
                  custom_elements: [
                    {
                      "og:image":
                        node.childMdx.background.childImageSharp.resize.src,
                    },
                  ],
                }
              }),
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 90,
      },
    },
    `gatsby-transformer-video`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `assets/svg/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-leaflet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
