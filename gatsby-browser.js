/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

exports.disableCorePrefetching = () => true

exports.onPrefetchPathname = ({ pathname, loadPage }) => {
  if (process.env.NODE_ENV !== `production`) return

  if (!pathname.match(/^\/(map|year)(\/|$)/)) {
    loadPage(pathname)
  }
}
