import { ResponsiveLine } from "@nivo/line"

export interface ElevationValue {
  distKilometers: number
  elevationMeters: number
}

export interface ElevationProfileProps {
  data: ElevationValue[]
}

export interface TooltipProps {
  point?: {
    data: {
      xFormatted: string | number
      yFormatted: string | number
    }
  }
}

export const Tooltip = ({ point }: TooltipProps) => (
  <dl className="elevation-profile-tooltip">
    <dt>Distance:</dt>
    <dd>{point?.data?.xFormatted}km</dd>
    <dt>Elevation:</dt>
    <dd>{point?.data?.yFormatted}m</dd>
  </dl>
)

const ElevationProfile = ({ data }: ElevationProfileProps) => {
  const minElevation = Math.min(...data.map(x => x.elevationMeters))
  const maxElevation = Math.max(...data.map(x => x.elevationMeters))
  const yBottom = Math.min(
    minElevation,
    100 * Math.max(0, Math.floor((minElevation - 1) / 100))
  )
  const yTop = 100 * Math.ceil((maxElevation + 1) / 100)

  return (
    <div className="elevation-profile">
      <ResponsiveLine
        data={[
          {
            id: "elevation",
            data: data.map(x => ({
              x: x.distKilometers,
              y: x.elevationMeters,
            })),
          },
        ]}
        xFormat=">-.1f"
        yFormat=">-.0f"
        margin={{ left: 50, bottom: 50, top: 10, right: 10 }}
        xScale={{ type: "linear", min: 0, max: "auto" }}
        yScale={{ type: "linear", min: yBottom, max: yTop }}
        axisBottom={{
          legend: "Distance travelled [km]",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          legend: "Elevation [m]",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enablePoints={false}
        enableArea
        areaBaselineValue={yBottom}
        colors={{ scheme: "category10" }}
        enableSlices="x"
        sliceTooltip={({ slice }) => {
          const point = slice.points.find(p => p.seriesId === "elevation")
          return <Tooltip point={point} />
        }}
      />
    </div>
  )
}

export default ElevationProfile
