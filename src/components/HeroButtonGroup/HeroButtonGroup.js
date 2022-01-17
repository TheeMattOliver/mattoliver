import React from "react"
import styled from "styled-components"
import { QUERIES } from "../../constants"

import PrimaryHeroBtnLink from "./PrimaryHeroBtnLink"
import SecondaryHeroBtnLink from "./SecondaryHeroBtnLink"

const HeroButtonGroup = () => {
  return (
    <Wrapper>
      <ButtonList>
        <ButtonContainer>
          <PrimaryHeroBtnLink to="/work">View Portfolio</PrimaryHeroBtnLink>
        </ButtonContainer>
        <ButtonContainer>
          <SecondaryHeroBtnLink to="/contact">Contact</SecondaryHeroBtnLink>
        </ButtonContainer>
      </ButtonList>
    </Wrapper>
  )
}

export default HeroButtonGroup

const Wrapper = styled.div`
  padding: 0 1rem;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  @media ${QUERIES.tabletAndUp} {
    padding: 0 2rem;
  }
  @media ${QUERIES.laptopAndUp} {
    /* max-width: 80rem; */
  }
  @media ${QUERIES.desktopAndUp} {
    /* max-width: revert; */
  }
`

const ButtonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  gap: 16px;
`

// const ButtonListItem = styled.div`
//   flex-basis: 100%;
//   padding: 12px;
//   min-width: 0px;
//   gap: 16px;
//   @media ${QUERIES.tabletAndUp} {
//     flex-basis: 50%;
//   }
// `;

const ButtonContainer = styled.div`
  flex: 1;
  justify-content: flex-start;
  align-items: stretch;
  display: flex;
`
