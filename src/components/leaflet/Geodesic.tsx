import {
  createPathComponent,
  LeafletContextInterface,
} from "@react-leaflet/core"
import { LatLngExpression, PolylineOptions } from "leaflet"
import { GeodesicLine as LGeodesicLine } from "leaflet.geodesic"

export interface GeodesicProps extends PolylineOptions {
  latlngs?: LatLngExpression[]
  wrap?: boolean
  steps?: number
  radius?: number
}

const createGeodesic = (
  props: GeodesicProps,
  context: LeafletContextInterface
) => {
  const { latlngs, ...options } = props
  const instance = new LGeodesicLine(latlngs, options)
  return { instance, context }
}

const Geodesic = createPathComponent(createGeodesic)

export default Geodesic
