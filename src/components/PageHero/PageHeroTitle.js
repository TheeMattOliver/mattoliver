/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import Spacer from "../Spacer"
import { Link } from "gatsby-plugin-react-intl"
import { FONT_WEIGHTS, QUERIES } from "../../constants"

const PageHeroTitle = ({ children }) => {
  return (
    <TitleWrapper>
      <HeroSpacer axis="vertical" size={32} />
      <HeroTitleText>{children}</HeroTitleText>
    </TitleWrapper>
  )
}

export default PageHeroTitle

const TitleWrapper = styled.div`
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
export const HeroTitleText = styled.h2`
  color: var(--color-textPrimary);
  font-weight: var(--font-weight-bold);
  font-size: clamp(2.625rem, 3.3vw + 1.25rem, 3.5rem);
  width: clamp(500px, 65%, 800px);
  max-width: 100%;
  font-variation-settings: "wght" 750;
`
const HeroSpacer = styled(Spacer)``
