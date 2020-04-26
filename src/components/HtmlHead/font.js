export const fontStyle = `
  @font-face {
    font-family: "Lato Light";
    src: url("fonts/LatoLatin-Light.woff2") format("woff2"),
      url("fonts/LatoLatin-Light.woff") format("woff");
    font-display: swap;
  }

  @font-face {
    font-family: "Lato Light";
    src: url("fonts/LatoLatin-LightItalic.woff2") format("woff2"),
      url("fonts/LatoLatin-LightItalic.woff") format("woff");
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: "Lato Light";
    src: url("fonts/LatoLatin-Regular.woff2") format("woff2"),
      url("fonts/LatoLatin-Regular.woff") format("woff");
    font-weight: bold;
    font-display: swap;
  }

  body {
    font-family: "Lato Light", sans-serif;
  }
`
