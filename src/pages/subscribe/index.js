import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons"
import { faRssSquare } from "@fortawesome/free-solid-svg-icons"
import { Link } from "gatsby"
import React from "react"

import { contentBaseStyle } from "../../styles"
import ContentStyleWrapper from "../../components/ContentStyleWrapper"
import HtmlHead from "../../components/HtmlHead"
import IconBullet from "../../components/IconBullet"
import Navigation from "../../components/navigation"
import SubscribeForm from "../../components/doveseed/SubscribeForm"

import "normalize.css"
import "@fortawesome/fontawesome-svg-core/styles.css"

const SubscribePage = () => (
  <>
    <HtmlHead path="/subscribe" language="en" />
    <Navigation fixed />
    <main css={contentBaseStyle}>
      <ContentStyleWrapper>
        <h1>How to subscribe to the blog</h1>
      </ContentStyleWrapper>
      <IconBullet icon={faEnvelopeSquare}>
        <h2>E-mail Notifications</h2>
        <SubscribeForm
          url="https://doveseed.adventures.jgosmann.de/subscribe"
          submitLabel="Subscribe"
        />
        <p css={{ opacity: 0.8, fontSize: "0.8em" }}>
          By subscribing with your e-mail you agree to the{" "}
          <Link to="/legal/privacy">privacy policy</Link>. In particular, you
          agree to receive e-mail from this website. For this the e-mail address
          will be stored and processed on the server. You may{" "}
          <Link to="/unsubscribe">unsubscribe</Link> any time.
        </p>
      </IconBullet>

      <IconBullet icon={faRssSquare}>
        <h2>RSS Feed</h2>

        <p>
          The blog provides an <Link to="/index.xml">RSS feed</Link> that can
          deliver new posts directly to you.{" "}
          <a href="http://www.whatisrss.com/">
            A short explanation of RSS can be found here.
          </a>
        </p>

        <p>
          To get the updates delivered automatically, you have a variety of
          options:
        </p>

        <ul>
          <li>
            You can use an RSS reader software. You will find lots of choices on
            you favourite search engine. Personally, I use the{" "}
            <a href="http://newsfox.mozdev.org/">NewsFox plugin for Firefox</a>.
          </li>
          <li>
            Many might prefer to get email notifications. Currently, I am not
            offering such a service myself for technical and legal reasons. But
            there are online services that send you email notifications based on
            an RSS feed:
            <ul>
              <li>
                <a href="https://ifttt.com/applets/147561p-rss-feed-to-email">
                  IFTTT
                </a>{" "}
                (stands for If This Than That), can do a lot more than just
                delivering email notifications for RSS feeds.
              </li>
              <li>
                <a href="https://blogtrottr.com/">Blogtrottr</a>
              </li>
            </ul>
          </li>
        </ul>
      </IconBullet>
    </main>
  </>
)

SubscribePage.propTypes = {}

export default SubscribePage
