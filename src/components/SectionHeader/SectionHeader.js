import React from "react"
import styled from "styled-components"
import { QUERIES } from "../../constants"

const SectionHeader = ({ id, children }) => {
  return (
    <Wrapper>
      <SectionTitle id={id}>{children}</SectionTitle>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const SectionTitle = styled.h3`
  color: var(--color-textPrimary);
  padding: 0 1rem;
  font-weight: medium;
  font-size: clamp(1.5rem, 2.25vw + 0.5rem, 2.5rem);
  @media ${QUERIES.lgAndUp} {
    line-height: 3rem;
    padding: 0 1.5rem;
    // optical alignment with table of contents aside:
    margin-top: -0.67rem;
  }
`

export default SectionHeader
