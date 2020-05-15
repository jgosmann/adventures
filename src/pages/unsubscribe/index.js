import React from "react"

import ContentStyleWrapper from "../../components/ContentStyleWrapper"
import HtmlHead from "../../components/HtmlHead"
import IndexNavigation from "../../components/navigation/IndexNavigation"
import SubscribeForm from "../../components/doveseed/SubscribeForm"

import "normalize.css"

const UnsubscribePage = () => (
  <>
    <HtmlHead path="/subscribe" language="en" />
    <IndexNavigation />
    <main>
      <ContentStyleWrapper>
        <h1>Unsubscribe from email notifications</h1>
        <p>
          To unsubscribe from the email notifications about new posts, enter
          your email address. Afterwards, you will receive an email with a
          confirmation link that you need to click.
        </p>
        <SubscribeForm
          url="https://doveseed.adventures.jgosmann.de/unsubscribe"
          submitLabel="Unsubscribe"
        />
      </ContentStyleWrapper>
    </main>
  </>
)

UnsubscribePage.propTypes = {}

export default UnsubscribePage
