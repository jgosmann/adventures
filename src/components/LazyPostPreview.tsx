import { useEffect, useState } from "react"

export interface LazyPostPreviewProps {
  postId: string
}

async function load(postId: string): Promise<string> {
  const response = await fetch(`/preview/${postId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch preview")
  }
  return await response.text()
}

function LazyPostPreview({ postId }: LazyPostPreviewProps) {
  const [state, setState] = useState({
    loading: true,
    error: false,
    data: "",
  })
  useEffect(() => {
    load(postId)
      .then(data => setState({ loading: false, error: false, data }))
      .catch(() => setState({ loading: false, error: true, data: "" }))
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: state.data }}></div>
}

export default LazyPostPreview
