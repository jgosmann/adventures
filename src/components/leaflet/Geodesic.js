import { createPathComponent } from "@react-leaflet/core"
import { GeodesicLine as LGeodesicLine } from "leaflet.geodesic"

const createGeodesic = (props, context) => {
  const { latlngs, ...options } = props
  const instance = new LGeodesicLine(latlngs, options)
  return { instance, context }
}

const Geodesic = createPathComponent(createGeodesic)

export default Geodesic
