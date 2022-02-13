import styled from "styled-components"
import { QUERIES } from "../../constants"

export const HeroSubheading = styled.h3`
  color: var(--color-text);
  /* padding-top: 16px; */
  line-height: clamp(1.625rem, 2vw + 1.25rem, 2.625rem);
  font-size: clamp(1.625rem, 2vw + 1.25rem, 2.625rem);
  width: clamp(500px, 95%, 800px);
  max-width: 100%;
  /* font-family: system-ui; */
  font-variation-settings: "wght" 400;
  font-weight: medium;
  a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
  @media ${QUERIES.smAndUp} {
    font-variation-settings: "wght" 400;
  }
  @media ${QUERIES.lgAndUp} {
    max-width: 80rem;
  }
`
