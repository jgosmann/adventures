import React from "react"
import ContentStyleWrapperComponent from "./ContentStyleWrapper"

export default {
  title: "Controls/Content Style Wrapper",
  component: ContentStyleWrapperComponent,
  parameters: {
    layout: "fullscreen",
  },
}

export const ContentStyleWrapper = () => (
  <ContentStyleWrapperComponent>
    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
    <ol>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ol>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    <iframe srcDoc='<body style="background: red;"></body>' />
    <p className="attribution">
      Attributed to <a href="/">link</a>
    </p>
  </ContentStyleWrapperComponent>
)
