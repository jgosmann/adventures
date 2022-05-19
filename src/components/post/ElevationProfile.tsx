import React from "react"
import { ResponsiveLine } from "@nivo/line"

import Spinner from "../Spinner"

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
  <dl
    css={{
      background: "#fff",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5);",
      borderRadius: 4,
      padding: 4,
      display: "grid",
      gridTemplateColumns: "auto auto",
      alignItems: "baseline",
      gridColumnGap: "1ex",
    }}
  >
    <dt>Distance:</dt>
    <dd css={{ fontWeight: "bold", margin: 0 }}>{point?.data?.xFormatted}km</dd>
    <dt>Elevation:</dt>
    <dd css={{ fontWeight: "bold", margin: 0 }}>{point?.data?.yFormatted}m</dd>
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
    <div
      css={{
        minHeight: 200,
        height: "50vh",
        maxHeight: 400,
        margin: "16px 64px",
      }}
    >
      {typeof window === "undefined" ? (
        <div css={{ textAlign: "center", fontSize: 48 }}>
          <Spinner />
        </div>
      ) : (
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
            const point = slice.points.find(p => p.serieId === "elevation")
            return <Tooltip point={point} />
          }}
        />
      )}
    </div>
  )
}

export default ElevationProfile
