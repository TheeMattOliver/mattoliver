import { createGlobalStyle } from "styled-components"
import { FONT_SIZES, FONT_WEIGHTS, LINE_HEIGHTS } from "../constants"

const GlobalStyles = createGlobalStyle`
  /*
    Use a better box model.
  */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }
  /*
    Remove margins in all browsers.
  */
  * {
    margin: 0;
  }
  /* 
    Sane image defaults
  */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  /* 
    Remove default form typography
  */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }
  /*
    Add accessible line height
    Improve text rendering
  */
    body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  /*
    Avoid text overflows
  */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  /* 
    Needed in order to prevent vertical scroll burglars 
    Allow percentage-based heights 
  */
    html,
  body,
  #___gatsby {
    height: 100%;
  }

  #gatsby-focus-wrapper {
    height: 100%;
  }
  
  /*
    Create a root stacking context, without a z-index.
    This ensures that all portal content (modals and tooltips) will
    float above the app.
  */
  #root,
  #___gatsby {
    isolation: isolate;

    /* box shadow */
    --box-shadow: 0 0 2rem -1rem rgba(0, 0, 0, 0.2);
    --box-shadow--small: 0 0 0.5rem -0.25rem rgba(0, 0, 0, 0.2);
    --box-shadow--primary: 0 0.5rem 1rem -0.5rem #0366d6;
    --box-shadow--primary-small: 0 0.25rem 0.5rem -0.25rem #0366d6;

    /* button */

    --form-field-line-height: 1.3;
    --focus-size: 0.1875em;
    --button-top-padding: 0.55em;
    --button-bottom-padding: 0.65em;
    --button-horizontal-padding: 0.9em;
    --button-line-height: var(--form-field-line-height);
    --button-border-radius: 0.375em;
  }
  :root {
     /* Typography variables */
    // Font stacks
    --body-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';

    // Monospace font stack
    // Note: SFMono-Regular needs to come before SF Mono to fix an older version of the font in Chrome
    --mono-font: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;

    // line heights
    --lh-condensed-ultra: ${LINE_HEIGHTS.condensedUltra}
    --lh-condensed: ${LINE_HEIGHTS.condensed}
    --lh-default: ${LINE_HEIGHTS.default}
    --lh-relaxed: ${LINE_HEIGHTS.relaxed}

    // Font weights
    --font-weight-ultrabold: ${FONT_WEIGHTS.ultrabold};
    --font-weight-bold: ${FONT_WEIGHTS.bold};
    --font-weight-semibold: ${FONT_WEIGHTS.semibold};
    --font-weight-normal: ${FONT_WEIGHTS.normal};
    --font-weight-light: ${FONT_WEIGHTS.light};

    /* Heading utilities */
    --hxl-size: ${FONT_SIZES[8]};
    --h0-size: ${FONT_SIZES[7]};
    --h1-size: ${FONT_SIZES[6]};
    --h2-size: ${FONT_SIZES[5]};
    --h3-size: ${FONT_SIZES[4]};
    --h4-size: ${FONT_SIZES[3]};
    --h5-size: ${FONT_SIZES[2]};
    --h6-size: ${FONT_SIZES[1]};

    /* Base body font size */
    --body-font-size: 16px;
    --body-line-height: var(--lh-default);

    /* Text styles */
    /* Set the font weight to normal */
    --text-normal: var(--font-weight-normal);
    /* Set the font weight to bold */
    --text-ultrabold: var(--font-weight-ultrabold);
    --text-bold: var(--font-weight-bold);
    --text-semibold: var(--font-weight-semibold);
    --text-light: var(--font-weight-light);
    /* Set to monospace font */
    --text-mono: var(--mono-font);
  }

  body {
    background: var(--color-background);
    color: var(--color-textPrimary);
    font-family: var(--body-font);
  }

  a {
    color: var(--color-secondary);
  }
 
`
export default GlobalStyles
