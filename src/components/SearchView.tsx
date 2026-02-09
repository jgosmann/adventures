import "../styles.css"
import LazyPostPreview from "./LazyPostPreview"

const pagefindModule = "/pagefind/pagefind.js"
const pagefind = await import(/* @vite-ignore */ pagefindModule)
pagefind.options({
  excerptLength: 0,
})
const searchQuery = new URLSearchParams(window.location.search).get("q")
const search = await pagefind.search(searchQuery, {
  sort: {
    date: "desc",
  },
})
const results = await Promise.all(search.results.map(r => r.data()))

export interface SearchViewProps {}

export const SearchView = ({}: SearchViewProps) => {
  return (
    <ol className="post-preview-list">
      {results.map(result => (
        <li>
          <LazyPostPreview postId={result.meta.id} />
        </li>
      ))}
    </ol>
  )
}

export default SearchView
