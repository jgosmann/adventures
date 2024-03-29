const { getSrc } = require("gatsby-plugin-image")

module.exports = {
  flags: { DEV_SSR: true },
  graphqlTypegen: true,
  siteMetadata: {
    title: `Jan's outdoor adventures`,
    description: `Jan's blog about adventures experienced outdoors and while travelling.`,
    author: `@jgosmann`,
    siteUrl: `https://adventures.jgosmann.de`,
    searchUrl: `https://search.adventures.jgosmann.de`,
  },
  plugins: [
    {
      // Alleviate memory problem
      // https://github.com/gatsbyjs/gatsby/issues/36899
      resolve: "gatsby-plugin-no-sourcemaps",
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          includePaths: ["node_modules"],
        },
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/assets/`,
      },
    },
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
    {
      resolve: `gatsby-plugin-mdx`,
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            output: "/index.xml",
            title: "Jan's outdoor adventures",
            query: `{
  allFile(
    filter: {sourceInstanceName: {eq: "posts"}, ext: {eq: ".mdx"}}
    sort: {childMdx: {frontmatter: {date: DESC}}}
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
            gatsbyImageData(width: 800, layout: FIXED)
          }
        }
      }
    }
  }
}`,
            custom_namespaces: {
              og: "http://ogp.me/ns#",
            },
            serialize: ({ query: { site, allFile } }) =>
              allFile.nodes.map(node => {
                const latLong = JSON.parse(`[${node.childMdx.frontmatter.map}]`)
                return {
                  ...node.childMdx.frontmatter,
                  url: site.siteMetadata.siteUrl + node.pagePath,
                  description: node.childMdx.excerpt,
                  lat: latLong[0],
                  long: latLong[1],
                  custom_elements: [
                    {
                      "og:image":
                        site.siteMetadata.siteUrl +
                        getSrc(node.childMdx.background),
                    },
                  ],
                }
              }),
          },
        ],
      },
    },
    `gatsby-transformer-csv`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 85,
      },
    },
    `gatsby-transformer-video`,
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Jan's outdoor adventures`,
        short_name: `Jan's adventures`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#cccccc`,
        display: `minimal-ui`,
        icon: `assets/svg/favicon.svg`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
