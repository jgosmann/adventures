export const searchUrl = "https://search"

export const staticQueryData = {
  allSitePage: {
    nodes: [
      { path: "/year/2020", context: { year: 2020 } },
      { path: "/year/2021", context: { year: 2021 } },
      { path: "/year/2022", context: { year: 2022 } },
    ],
  },
  site: {
    siteMetadata: {
      searchUrl,
    },
  },
  icon: {
    publicURL: "marker-icon.png",
  },
  iconRetina: {
    publicURL: "marker-icon-2x.png",
  },
  shadow: {
    publicURL: "marker-shadow.png",
  },
}
