/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { Link } from "gatsby-plugin-react-intl"
import { COLORS, QUERIES, FONT_WEIGHTS } from "../../constants"
import VisuallyHidden from "../VisuallyHidden"

export default function FormSubmitThankYou() {
  return (
    <>
      <VisuallyHidden>Form submitted successfully</VisuallyHidden>

      <MessageWrapper>
        <h3>Success!</h3>
        <p>Thanks for your note.</p>
        <p>
          I'll be in touch very soon, and until then feel free to keep poking
          around the site.
        </p>
        <NavigationLinksWrapper>
          <NavigationLink to="/">&larr; Back to Home</NavigationLink>
        </NavigationLinksWrapper>
      </MessageWrapper>
    </>
  )
}

const MessageWrapper = styled.div`
  /* py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12 */
  padding-top: 4rem;
  padding: 1rem;
  h3 {
    font-size: 2rem;
    margin-bottom: 16px;
    color: var(--color-gray900);
  }
  /* mt-6 text-base text-indigo-50 max-w-3xl */
  p {
    margin-top: 24px;
    color: var(--color-gray700);
    max-width: 48rem;
    line-height: 1.5rem;
    font-size: clamp(1rem, /* 1.3vw + .9rem, */ 1.25vw + 0.5rem, 1.45rem);
    width: clamp(300px, 95%, 750px);
  }
  @media ${QUERIES.smAndUp} {
    padding: 1rem;
    grid-column: span 2 / span 2;
  }
  @media ${QUERIES.desktopAndUp} {
    padding: 4rem;
  }
`

const NavigationLinksWrapper = styled.div`
  display: flex;
  margin-top: 4rem;
  width: 85%;
`

const NavigationLink = styled(Link)`
  margin-top: 4rem;
  font-size: 1.125;
  filter: saturate(0);
  margin-top: 8px;
  color: var(--color-gray700);
  font-weight: ${FONT_WEIGHTS.normal};
`
