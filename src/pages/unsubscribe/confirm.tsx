import React from "react"

import ConfirmationButton from "../../components/doveseed/ConfirmationButton"
import ContentStyleWrapper from "../../components/ContentStyleWrapper"
import HtmlHead from "../../components/HtmlHead"
import Navigation from "../../components/navigation"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

export const Head = () => (
  <HtmlHead path="/unsubscribe/confirm" title="Unsubscribe confirmation" />
)

const ConfirmPage = () => (
  <>
    <Navigation path="/unsubscribe/confirm" fixed />
    <main css={{ marginTop: 48 }}>
      <ContentStyleWrapper>
        <h1>Confirm unsubscribing</h1>
        <p>
          You are unsubscribing the following email address from email
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
