import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background: var(--color-background);
    color: var(--color-text);
  }

  a {
    color: var(--color-secondary);
  }
  #root {
    /*
      Create a stacking context, without a z-index.
      This ensures that all portal content (modals and tooltips) will
      float above the app.
    */
    isolation: isolate;
  }
`;

export default GlobalStyles;
