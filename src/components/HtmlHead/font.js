import { withPrefix } from "gatsby"

export const fontStyle = `
  @font-face {
    font-family: "Lato";
    src: url("${withPrefix("/fonts/LatoLatin-Regular.woff2")}") format("woff2"),
      url("${withPrefix("/fonts/LatoLatin-Regular.woff")}") format("woff");
    font-display: swap;
  }

  @font-face {
    font-family: "Lato";
    src: url("${withPrefix("/fonts/LatoLatin-Italic.woff2")}") format("woff2"),
      url("${withPrefix("/fonts/LatoLatin-Italic.woff")}") format("woff");
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "Lato";
    src: url("${withPrefix("/fonts/LatoLatin-Bold.woff2")}") format("woff2"),
      url("${withPrefix("/fonts/LatoLatin-Bold.woff")}") format("woff");
    font-weight: bold;
    font-display: swap;
  }

  body {
    font-family: "Lato", sans-serif;
  }
`
