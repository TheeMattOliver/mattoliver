import styled from "styled-components"
import { QUERIES } from "../../constants"

export const HeroCopyText = styled.p`
  color: var(--color-text);
  line-height: clamp(2.15rem, /* 1.3vw + .9rem, */ 1.75vw + 0.5rem, 1.95rem);
  font-size: clamp(1.5rem, /* 1.3vw + .9rem, */ 1.75vw + 0.5rem, 1.95rem);
  a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
  width: clamp(500px, 95%, 800px);
  @media ${QUERIES.smAndUp} {
  }
`
