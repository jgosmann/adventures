import React from "react"

import ConfirmationButton from "../../components/doveseed/ConfirmationButton"
import ContentStyleWrapper from "../../components/ContentStyleWrapper"
import HtmlHead from "../../components/HtmlHead"
import IndexNavigation from "../../components/navigation/IndexNavigation"

import "normalize.css"

const ConfirmPage = () => (
  <>
    <HtmlHead path="/subscribe" language="en" />
    <IndexNavigation />
    <main>
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

ConfirmPage.propTypes = {}

export default ConfirmPage
