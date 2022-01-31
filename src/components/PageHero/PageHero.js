/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { Link } from "gatsby-plugin-react-intl"
import { QUERIES } from "../../constants"

const PageHero = ({ children }) => {
  return (
    <Wrapper>
      <HeroBox>
        <HeroTitle>{children}</HeroTitle>
      </HeroBox>
    </Wrapper>
  )
}

export default PageHero

const Wrapper = styled.div`
  /* margin-left: auto;
  margin-right: auto; */
  @media ${QUERIES.smAndUp} {
  }
  @media ${QUERIES.lgAndUp} {
    /* max-width: 80rem; */
  }
  @media ${QUERIES.xlAndUp} {
    /* max-width: revert; */
  }
`
const HeroTitle = styled.h2`
  color: var(--color-textPrimary);
  font-weight: bold;
  font-size: clamp(2.625rem, 3.3vw + 1.25rem, 3.5rem);
  width: clamp(500px, 65%, 800px);
  max-width: 100%;
  /* font-family: system-ui; */
  font-variation-settings: "wght" 750;
`
const HeroBox = styled.div`
  margin-top: 32px;
`
