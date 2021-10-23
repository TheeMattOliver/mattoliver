/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import { nest, key, rollup, entries, map } from "d3-collection"
import styled from "styled-components"

import ScatterPlot from "../../components/D3ReactHooks/ScatterGlobalTemps"
import BarChartPopulation from "../../components/D3ReactHooks/BarChartPopulation"

import { ageVariables, states, getByValue } from "../../lib/census-helpers"

// const censusBaseUrl = `https://api.census.gov/data/2019/acs/acs5?get=${Object.keys(
//   ageVariables
// ).join()}`

export default function TestingPage() {
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

  if (!censusData) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div>
      <div className="stateSelector">
        <select
          value={selectedState}
          // onChange={event => setSelectedState(event.target.value)}
          onChange={handleChange}
        >
          {statesArr.map((option, index) => (
            <option key={index} value={option}>
              {option}{" "}
            </option>
          ))}
        </select>
      </div>
      <BarChartPopulation data={censusData} />
    </div>
  )
}
