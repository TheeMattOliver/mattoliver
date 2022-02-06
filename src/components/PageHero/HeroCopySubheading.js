import styled from "styled-components"
import { QUERIES } from "../../constants"

// export const HeroCopySubheading = styled.h3`
//   color: var(--color-textPrimary);
//   padding: 0 1rem;
//   margin-top: 16px;
//   line-height: clamp(1.5rem, 2vw + 1.25rem, 2.5rem);
//   font-size: clamp(1.5rem, 2vw + 1.25rem, 2.5rem);
//   width: clamp(500px, 95%, 800px);
//   max-width: 100%;
//   /* font-family: system-ui; */
//   font-variation-settings: "wght" 400;
//   font-weight: medium;
//   a {
//     color: var(--color-textLink);
//     text-decoration: underline;
//   }
//   @media ${QUERIES.smAndUp} {
//     padding: 0 1.5rem;
//     font-variation-settings: "wght" 400;
//   }
//   @media ${QUERIES.lgAndUp} {
//     max-width: 80rem;
//   }
// `

export const HeroCopySubheading = styled.h3`
  color: var(--color-textPrimary);
  padding-top: 16px;
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
