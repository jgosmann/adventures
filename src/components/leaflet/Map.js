import leaflet from "leaflet"
import PropTypes from "prop-types"
import React from "react"
import { Map as LeafletMap, TileLayer } from "react-leaflet"

import "leaflet/dist/leaflet.css"

const Map = ({ children, ...props }) => {
  if (typeof window === "undefined") {
    return null
  }

  const url =
    "https://api.mapbox.com/styles/v1/jgosmann/" +
    "cjtlceqtm0xh71fnkgt3725ou/tiles/256/{z}/{x}/{y}@2x?" +
    "access_token={accessToken}"
  const attribution =
    "Map data &copy; " +
    '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> ' +
    "contributors, " +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">' +
    'CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
  const accessToken =
    "pk.eyJ1Ijoiamdvc21hbm4iLCJhIjoiY2p0a2pnbGRmM2JlMDQzbzlzdW" +
    "trYjZiOSJ9.u2TRWUpD5guUay3Nn_Twiw"
  return (
    <LeafletMap
      css={{ height: "100%" }}
      dragging={!leaflet.Browser.mobile}
      tap={!leaflet.Browser.mobile}
      scrollWheelZoom={false}
      {...props}
    >
      <TileLayer
        url={url}
        attribution={attribution}
        maxZoom={18}
        id="mapbox.outdoors"
        accessToken={accessToken}
      />
      {children}
    </LeafletMap>
  )
}

Map.propTypes = {
  children: PropTypes.node,
}

export default Map
