import styled from "styled-components"
import { QUERIES } from "../../constants"

export const HeroCopyText = styled.p`
  color: var(--color-textPrimary);
  /* margin-top: 2.75rem; */
  /* padding: 0 1rem; */
  line-height: clamp(2.15rem, /* 1.3vw + .9rem, */ 1.75vw + 0.5rem, 1.95rem);
  font-size: clamp(1.5rem, /* 1.3vw + .9rem, */ 1.75vw + 0.5rem, 1.95rem);
  a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
  width: clamp(300px, 95%, 750px);
  @media ${QUERIES.smAndUp} {
    /* padding: 0 2rem; */
  }
`
