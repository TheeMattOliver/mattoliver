import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  * {
    margin: 0;
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    text-rendering: optimizelegibility;
  }
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  /* purgecss start ignore */
  #root,
  #___gatsby {
    /*
      Create a stacking context, without a z-index.
      This ensures that all portal content (modals and tooltips) will
      float above the app.
    */
    isolation: isolate;

    /* box shadow */
    --box-shadow: 0 0 2rem -1rem rgba(0, 0, 0, 0.2);
    --box-shadow--small: 0 0 0.5rem -0.25rem rgba(0, 0, 0, 0.2);
    --box-shadow--primary: 0 0.5rem 1rem -0.5rem #0366d6;
    --box-shadow--primary-small: 0 0.25rem 0.5rem -0.25rem #0366d6;

    /* button */

    --line-height: 1.5;
    --form-field-line-height: 1.3;
    --focus-size: 0.1875em;
    --button-top-padding: 0.55em;
    --button-bottom-padding: 0.65em;
    --button-horizontal-padding: 0.9em;
    --button-line-height: var(--form-field-line-height);
    --button-border-radius: 0.375em;
  }

  /* Needed in order to prevent vertical scroll burglars */
  html,
  body,
  #___gatsby {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    height: 100%;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  #gatsby-focus-wrapper {
    height: 100%;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }
  body {
    background: var(--color-background);
    color: var(--color-text);
  }

  a {
    color: var(--color-secondary);
  }
 
`
export default GlobalStyles
