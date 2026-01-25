import ElevationProfile from "./ElevationProfile"
import WithRemoteGpxTrack, { type TrackPoint } from "./WithRemoteGpxTrack"

export interface GpxElevationProfileProps {
  url: string
}

const earthRadiusMeters = 6371e3

const calcDistKilometers = (p1: TrackPoint, p2: TrackPoint): number => {
  if (
    p1.lat === undefined ||
    p1.lon === undefined ||
    p2.lat === undefined ||
    p2.lon === undefined
  ) {
    return 0
  }

  const phi1 = (p1.lat * Math.PI) / 180
  const phi2 = (p2.lat * Math.PI) / 180
  const deltaPhi = ((p2.lat - p1.lat) * Math.PI) / 180
  const deltaLambda = ((p2.lon - p1.lon) * Math.PI) / 180
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return (earthRadiusMeters * c) / 1000
}

const GpxElevationProfile = ({ url }: GpxElevationProfileProps) => {
  return (
    <WithRemoteGpxTrack
      url={url}
      render={track => (
        <ElevationProfile
          data={(track?.segments || [])
            .flatMap(segment => segment)
            .reduce(
              (
                mappedArray: Array<
                  TrackPoint & {
                    distKilometers: number
                    elevationMeters: number
                  }
                >,
                point
              ) => {
                const distKilometers =
                  mappedArray.length === 0
                    ? 0
                    : mappedArray[mappedArray.length - 1].distKilometers +
                      calcDistKilometers(
                        mappedArray[mappedArray.length - 1],
                        point
                      )
                if (point.elevationMeters !== undefined) {
                  mappedArray.push({
                    lat: point.lat,
                    lon: point.lon,
                    distKilometers,
                    elevationMeters: point.elevationMeters,
                  })
                }
                return mappedArray
              },
              []
            )}
        />
      )}
    />
  )
}

export default GpxElevationProfile
