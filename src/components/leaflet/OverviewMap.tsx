import Map from "./Map"
import Marker from "./Marker"
import MarkerClusterGroup from "@changey/react-leaflet-markercluster"
import "@changey/react-leaflet-markercluster/dist/styles.min.css"
import { Popup } from "react-leaflet"
import LazyPostPreview from "../LazyPostPreview"

export interface OverviewMapProps {
  posts: Array<{
    id: string
    data: {
      map: string
    }
  }>
}

const getNodeLatLng = (mapDef: string) => JSON.parse(`[${mapDef}]`)

function OverviewMap({ posts }: OverviewMapProps) {
  return (
    <Map
      bounds={posts.map(post => getNodeLatLng(post.data.map))}
      boundsOptions={{ padding: [50, 50] }}
      scrollWheelZoom={true}
      dragging={true}
    >
      <MarkerClusterGroup>
        {posts.map(post => (
          <Marker key={post.id} position={getNodeLatLng(post.data.map)}>
            <Popup>
              <LazyPostPreview postId={post.id} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </Map>
  )
}

export default OverviewMap
