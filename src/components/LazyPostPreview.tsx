import { useEffect, useState } from "react"

export interface LazyPostPreviewProps {
  postId: string
}

async function load(postId: string): Promise<string> {
  const response = await fetch(`/preview/${postId}`)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch preview (${response.status} ${
        response.statusText
      }): ${response.text()}`
    )
  }
  return await response.text()
}

function LazyPostPreview({ postId }: LazyPostPreviewProps) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: "",
  })
  useEffect(() => {
    load(postId)
      .then(data => setState({ loading: false, error: null, data }))
      .catch(error => setState({ loading: false, error, data: "" }))
  }, [])

  return (
    <div dangerouslySetInnerHTML={{ __html: state.data }}>{state.error}</div>
  )
}

export default LazyPostPreview
