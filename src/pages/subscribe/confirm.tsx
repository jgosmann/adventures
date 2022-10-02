import React from "react"

import ConfirmationButton from "../../components/doveseed/ConfirmationButton"
import ContentStyleWrapper from "../../components/ContentStyleWrapper"
import HtmlHead from "../../components/HtmlHead"
import Navigation from "../../components/navigation"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

export const Head = () => <HtmlHead path="/subscribe/confirm" />

const ConfirmPage = () => (
  <>
    <Navigation path="/subscribe/confirm" fixed />
    <main css={{ marginTop: 48 }}>
      <ContentStyleWrapper>
        <h1>Confirm subscription</h1>
        <p>
          You are subscribing the following email address to receive email
          notifications for new posts:
        </p>
        <ConfirmationButton
          url="https://doveseed.adventures.jgosmann.de/confirm/"
          submitLabel="Confirm"
        />
      </ContentStyleWrapper>
    </main>
  </>
)

export default ConfirmPage
