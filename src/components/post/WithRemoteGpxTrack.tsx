import { useEffect, useState } from "react"

export interface TrackPoint {
  lat?: number
  lon?: number
  elevationMeters?: number
}

export type Segment = TrackPoint[]

export interface Track {
  segments: Segment[]
}

export const useRemoteGpxTrack = (url: string): Track | undefined => {
  const [track, setTrack] = useState<Track | undefined>(undefined)
  useEffect(() => {
    const req = new XMLHttpRequest()
    const onLoad = () => {
      if (req.responseXML) {
        setTrack({
          segments: Array.from(
            req.responseXML.getElementsByTagName("trkseg")
          ).map(segment =>
            Array.from(segment.getElementsByTagName("trkpt")).map(point => {
              const lat = point.getAttribute("lat")
              const lon = point.getAttribute("lon")
              const elevation =
                point.getElementsByTagName("ele")[0]?.textContent
              return {
                lat: lat ? Number.parseFloat(lat) : undefined,
                lon: lon ? Number.parseFloat(lon) : undefined,
                elevationMeters: elevation
                  ? Number.parseFloat(elevation)
                  : undefined,
              }
            })
          ),
        })
      }
    }
    req.addEventListener("load", onLoad)
    req.open("GET", url)
    req.send()
    return () => req.removeEventListener("load", onLoad)
  }, [])
  return track
}

export interface WithRemoteGpxTrackProps {
  url: string
  render: (track?: Track) => JSX.Element
}

const WithRemoteGpxTrack = ({ url, render }: WithRemoteGpxTrackProps) => {
  const track = useRemoteGpxTrack(url)
  return render(track)
}

export default WithRemoteGpxTrack
