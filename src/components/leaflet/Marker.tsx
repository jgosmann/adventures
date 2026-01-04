import leaflet from "leaflet"
import type { MarkerProps } from "react-leaflet"
import { Marker as LeafletMarker } from "react-leaflet"

import icon from "leaflet/dist/images/marker-icon.png"
import iconRetina from "leaflet/dist/images/marker-icon-2x.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

export type { MarkerProps }

const Marker = (props: MarkerProps) => {
  const DefaultIcon = new leaflet.Icon({
    iconAnchor: [12, 41],
    iconRetinaUrl: iconRetina.src,
    iconSize: [icon.width, icon.height],
    iconUrl: icon.src,
    shadowSize: [iconShadow.width, iconShadow.height],
    shadowUrl: iconShadow.src,
    tooltipAnchor: [16, -28],
  })

  return <LeafletMarker icon={DefaultIcon} {...props} />
}

export default Marker
