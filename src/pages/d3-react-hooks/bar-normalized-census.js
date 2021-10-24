import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import { nest, key, rollup, entries, map } from "d3-collection"

import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function BarNormalizedCensusPage() {
  return (
    <ChartPage title={`Bar chart and the Census API`} copy={copy}>
      {censusData ? (
        <BarChartPopulation data={censusData} />
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}

      <ButtonWrapper>
        <StateSelect value={selectedState} onChange={handleChange}>
          {statesArr.map((option, index) => (
            <option key={index} value={option}>
              {option}{" "}
            </option>
          ))}
        </StateSelect>
      </ButtonWrapper>
    </ChartPage>
  )
}
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  /* justify-content: space-between; */
  padding-right: 1.67rem;
  padding-bottom: 2rem;
`
const StateSelect = styled(Select)``
