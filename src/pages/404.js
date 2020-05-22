import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCompass } from "@fortawesome/free-regular-svg-icons"
import React from "react"

import HtmlHead from "../components/HtmlHead"
import Navigation from "../components/navigation"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

const NotFoundPage = () => (
  <>
    <HtmlHead language="en" />
    <Navigation fixed />
    <main css={{ textAlign: "center" }}>
      <h1>
        <FontAwesomeIcon icon={faCompass} /> Not found
      </h1>
      <p>Seems like we are lost.</p>
    </main>
  </>
)

NotFoundPage.propTypes = {}

export default NotFoundPage
