import React from "react"
import styled from "styled-components"
import { navigate } from "gatsby"
import { QUERIES } from "../../constants"

import PrimaryHeroBtnLink from "./PrimaryHeroBtnLink"
import SecondaryHeroBtnLink from "./SecondaryHeroBtnLink"
import { Button } from "../Button"

const HeroButtonGroup = () => {
  return (
    <Wrapper>
      <ButtonList>
        <ButtonContainer>
          <Button
            variant="secondary"
            size="large"
            onClick={() => {
              navigate("/work")
            }}
          >
            See some projects
          </Button>
          {/* <PrimaryHeroBtnLink to="/work">View Portfolio</PrimaryHeroBtnLink> */}
        </ButtonContainer>
        <ButtonContainer>
          <Button
            variant="outline"
            size="large"
            onClick={() => {
              navigate("/work")
            }}
          >
            See some dogs
          </Button>
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
  @media ${QUERIES.smAndUp} {
    padding: 0 2rem;
  }
  @media ${QUERIES.lgAndUp} {
    /* max-width: 80rem; */
  }
  @media ${QUERIES.xlAndUp} {
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
//   @media ${QUERIES.smAndUp} {
//     flex-basis: 50%;
//   }
// `;

const ButtonContainer = styled.div`
  flex: 1;
  justify-content: flex-start;
  align-items: stretch;
  display: flex;
`
