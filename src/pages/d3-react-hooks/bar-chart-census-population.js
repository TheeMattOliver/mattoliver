import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import { nest, key, rollup, entries, map } from "d3-collection"

import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"
import DataToggleButton from "../../components/DataToggleButton"
import Select from "../../components/Select"

import BarChartPopulation from "../../components/D3ReactHooks/BarChartPopulation"
import { ageVariables, states, getByValue } from "../../lib/census-helpers"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function BarChartPopulationPage() {
  const [selectedState, setSelectedState] = useState("All states")
  const [censusData, setCensusData] = useState("")
  const [geography, setGeography] = useState("us")

  const handleChange = event => {
    setSelectedState(event.target.value)
    let mapValue = getByValue(states, event.target.value)
    mapValue !== "*" ? setGeography("state") : setGeography("us")
  }

  useEffect(() => {
    d3.json(
      `https://api.census.gov/data/2019/acs/acs5?get=${Object.keys(
        ageVariables
      ).join()}&for=${geography}:${getByValue(states, selectedState)}`
    ).then(data => {
      let censusData = nest()
        .key(([code]) => ageVariables[code])
        .rollup(values => d3.sum(values, ([code, value]) => +value))
        .entries(d3.transpose(data).slice(0, -1))
        .map(({ key, value }) => ({ name: key, value }))
      console.log("selectedState: ", selectedState)
      console.log("censusData: ", censusData)
      setCensusData(censusData)
    })
  }, [selectedState, geography])
  // Array.from( states ).map(([key, value]) => ({ key, value }));

  let statesArr = [...states].map(value => value[1])

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
