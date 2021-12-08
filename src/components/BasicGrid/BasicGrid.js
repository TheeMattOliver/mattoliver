/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { QUERIES, COLORS } from "../../constants"

const BasicGrid = () => {
  return (
    <GridWrapper>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
    </GridWrapper>
  )
}

export default BasicGrid

const GridWrapper = styled.div`
  --min-column-width: min(320px, 100%);
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--min-column-width), 1fr)
  );
  gap: 16px;
  padding: 16px;
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
`

const ItemTest = styled.div`
  height: 325px;
  border: solid 1px var(--color-borderPrimary);
  background: var(--color-backgroundOverlay);
  border-radius: 3px;
  padding: 16px;
`
