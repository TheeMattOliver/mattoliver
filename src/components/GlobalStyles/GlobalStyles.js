import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100%;
  }
  body {
    background: var(--color-background);
    color: var(--color-text);
  }

  a {
    color: var(--color-secondary);
  }
 
`;

export default GlobalStyles;
