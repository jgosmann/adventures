import React from "react"

import ConfirmationButton from "../../components/doveseed/ConfirmationButton"
import ContentStyleWrapper from "../../components/ContentStyleWrapper"
import HtmlHead from "../../components/HtmlHead"
import Navigation from "../../components/navigation"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

const ConfirmPage = () => (
  <>
    <HtmlHead path="/unsubscribe/confirm" language="en" />
    <Navigation path="/unsubscribe/confirm" fixed />
    <main css={{ marginTop: 48 }}>
      <ContentStyleWrapper>
        <h1>Confirm unsubscribing</h1>
        <p>
          You are unsubscribing the following email address from email
          notifications for new posts:
        </p>
        <p>
          <ConfirmationButton
            url="https://doveseed.adventures.jgosmann.de/confirm/"
            submitLabel="Confirm"
          />
        </p>
      </ContentStyleWrapper>
    </main>
  </>
)

export default ConfirmPage
