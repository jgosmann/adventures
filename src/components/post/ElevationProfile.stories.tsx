import React from "react"

import ElevationProfileComponent, {
  Tooltip as TooltipComponent,
} from "./ElevationProfile"

export default {
  title: "Post/Elevation Profile",
  component: ElevationProfileComponent,
}

export const ElevationProfile = {
  render: () => (
    <ElevationProfileComponent
      data={[
        { distKilometers: 0, elevationMeters: 500 },
        { distKilometers: 10, elevationMeters: 540 },
        { distKilometers: 20, elevationMeters: 490 },
        { distKilometers: 45, elevationMeters: 555 },
      ]}
    />
  ),

  parameters: {
    storyshots: { disable: true }, // Renders only spinner or empty canvas initially
  },
}

export const Tooltip = () => (
  <div style={{ display: "inline-block" }}>
    <TooltipComponent point={{ data: { xFormatted: 100, yFormatted: 500 } }} />
  </div>
)
