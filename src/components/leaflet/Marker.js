import { graphql, useStaticQuery } from "gatsby"
import leaflet from "leaflet"
import React from "react"
import { Marker as LeafletMarker } from "react-leaflet"

const Marker = props => {
  const iconImages = useStaticQuery(graphql`
    query {
      icon: file(
        sourceInstanceName: { eq: "leaflet" }
        relativePath: { eq: "images/marker-icon.png" }
      ) {
        publicURL
      }
      iconRetina: file(
        sourceInstanceName: { eq: "leaflet" }
        relativePath: { eq: "images/marker-icon-2x.png" }
      ) {
        publicURL
      }
      shadow: file(
        sourceInstanceName: { eq: "leaflet" }
        relativePath: { eq: "images/marker-shadow.png" }
      ) {
        publicURL
      }
    }
  `)
  const DefaultIcon = new leaflet.Icon({
    iconAnchor: [12, 41],
    iconRetinaUrl: iconImages.iconRetina.publicURL,
    iconSize: [25, 41],
    iconUrl: iconImages.icon.publicURL,
    shadowSize: [41, 41],
    shadowUrl: iconImages.shadow.publicURL,
    tooltipAnchor: [16, -28],
  })

  return <LeafletMarker icon={DefaultIcon} {...props} />
}

export default Marker
