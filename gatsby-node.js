/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const fs = require("fs")
const FlexSearch = require("flexsearch")
const axios = require("axios").default
const path = require("path")

const accessTokensPromise = (async () =>
  JSON.parse(await fs.promises.readFile("access-tokens.json")))()

const reverseGeocode = async ({ lat, long }) => {
  const languages = ["de", "en"]
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json`,
      {
        params: {
          types: "place",
          language: languages.join(","),
          access_token: (await accessTokensPromise).mapbox,
        },
      }
    )
    return response.data.features
      .map(feature =>
        [feature.place_name].concat(
          languages.map(lang => feature[`place_name_${lang}`])
        )
      )
      .join("; ")
  } catch (error) {
    console.error(error)
    throw error
  }
}

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
          const lang = parts.length > 1 ? parts[parts.length - 1] : ""
          return `/${[
            lang,
            source.sourceInstanceName,
            source.relativeDirectory,
            name === "index" ? "" : name,
          ]
            .filter(x => x.length > 0)
            .join("/")}/`
        },
      },
    },
  })
}

const createYearlyIndices = async ({ actions, graphql }) => {
  const { createPage } = actions

  const postListTemplate = path.resolve("src/templates/PostList.js")

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
                favorite
              }
            }
          }
        }
      }
    `)
  ).data.allFile.nodes.map(post => ({
    id: post.childMdx.id,
    date: new Date(post.childMdx.frontmatter.date),
    favorite: post.childMdx.frontmatter.favorite,
  }))

  // Paged default index
  const postsPerPage = 20
  const numPages = Math.ceil(posts.length / postsPerPage)
  const pagePath = i => (i === 0 ? "/" : `/page/${i + 1}`)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: pagePath(i),
      component: postListTemplate,
      context: {
        postIds: posts
          .slice(i * postsPerPage, (i + 1) * postsPerPage)
          .map(post => post.id),
        numPages,
        currentPage: i + 1,
        prevPage: i > 0 ? pagePath(i - 1) : undefined,
        nextPage: i + 1 < numPages ? pagePath(i + 1) : undefined,
      },
    })
  })

  // Favorites index
  createPage({
    path: `/favorites`,
    component: postListTemplate,
    context: {
      postIds: posts.filter(post => post.favorite).map(post => post.id),
    },
  })

  // Yearly indices
  let start = 0
  while (start < posts.length) {
    const year = posts[start].date.getFullYear()
    let end = start + 1
    for (; end < posts.length && year == posts[end].date.getFullYear(); ++end);
    createPage({
      path: `/year/${year}/`,
      component: postListTemplate,
      context: {
        postIds: posts.slice(start, end).map(post => post.id),
        year,
      },
    })
    start = end
  }
}

const createSearchIndex = async ({ graphql }) => {
  const extractTextFromMdxAst = ({ type, value, children }) => {
    if (type === "text") return value
    if (!children) return ""
    if (type === "paragraph")
      return children.map(extractTextFromMdxAst).join("")
    return children.map(extractTextFromMdxAst).join("\n\n")
  }

  let nextId = 0
  const preprocessDoc = async post => {
    const [lat, long] = JSON.parse(`[${post.childMdx.frontmatter.map}]`)
    return {
      pagePath: post.pagePath,
      childMdx: {
        ...post.childMdx,
        mdxAST: undefined,
      },
      search: {
        id: nextId++,
        categories: post.childMdx.frontmatter.categories.join(" "),
        content: extractTextFromMdxAst(post.childMdx.mdxAST),
        location: await reverseGeocode({ lat, long }),
      },
    }
  }

  const posts = (
    await graphql(`
      {
        allFile(
          filter: { sourceInstanceName: { eq: "posts" }, ext: { eq: ".mdx" } }
        ) {
          nodes {
            pagePath
            childMdx {
              id
              background {
                childImageSharp {
                  gatsbyImageData(
                    width: 300
                    height: 250
                    layout: FIXED
                    placeholder: TRACED_SVG
                  )
                }
              }
              frontmatter {
                categories
                date
                title
                map
              }
              timeToRead
              mdxAST
            }
          }
        }
      }
    `)
  ).data.allFile.nodes

  const searchIndex = new FlexSearch({
    encode: "advanced",
    tokenize: "reverse",
    threshold: false,
    cache: false,
    doc: {
      id: "search:id",
      store: ["pagePath", "childMdx"],
      field: [
        "search:categories",
        "search:location",
        "childMdx:frontmatter:title",
        "search:content",
      ],
    },
  })

  searchIndex.add(await Promise.all(posts.map(preprocessDoc)))
  await fs.promises.writeFile("./public/search.json", searchIndex.export())
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

exports.createPages = args => {
  return Promise.all([
    createYearlyIndices(args),
    createSearchIndex(args),
    createPostPages(args),
    createLegalPages(args),
  ])
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
