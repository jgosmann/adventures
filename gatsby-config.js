module.exports = {
  siteMetadata: {
    title: `Jan's outdoor adventures`,
    description: `Jan's blog about adventures experienced outdoors and while travelling.`,
    author: `@jgosmann`,
    siteUrl: `https://adventures.jgosmann.de`,
  },
  plugins: [
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
        name: `leaflet`,
        path: `${__dirname}/node_modules/leaflet/dist/`,
      },
    },
    `gatsby-plugin-mdx`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: 90,
      },
    },
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
