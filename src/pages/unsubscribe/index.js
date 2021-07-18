import React from "react"

import ContentStyleWrapper from "../../components/ContentStyleWrapper"
import HtmlHead from "../../components/HtmlHead"
import Navigation from "../../components/navigation"
import SubscribeForm from "../../components/doveseed/SubscribeForm"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

const UnsubscribePage = () => (
  <>
    <HtmlHead path="/subscribe" language="en" />
    <Navigation fixed />
    <main css={{ marginTop: 48 }}>
      <ContentStyleWrapper>
        <h1>Unsubscribe from email notifications</h1>
        <p>
          To unsubscribe from the email notifications about new posts, enter
          your email address. Afterwards, you will receive an email with a
          confirmation link that you need to click.
        </p>
        <p>
          <SubscribeForm
            url="https://doveseed.adventures.jgosmann.de/unsubscribe"
            submitLabel="Unsubscribe"
          />
        </p>
      </ContentStyleWrapper>
    </main>
  </>
)

UnsubscribePage.propTypes = {}

export default UnsubscribePage
