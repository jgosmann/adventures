import leaflet from "leaflet"
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer } from "react-leaflet"

import Spinner from "../Spinner"

import "leaflet/dist/leaflet.css"

const Map = ({ children, ...props }) => {
  // Workaround for react-leaflet, hydrations does not work correctly when
  // rendering immediatly.
  const [render, setRender] = useState(false)
  useEffect(() => setRender(true), [])

  if (!render || typeof window === "undefined") {
    return (
      <div css={{ textAlign: "center", fontSize: 48, margin: "32px 0" }}>
        <Spinner />
      </div>
    )
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
    <MapContainer
      css={{ height: "100%", zIndex: 0 }}
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
    </MapContainer>
  )
}

Map.propTypes = {
  children: PropTypes.node,
}

export default Map
