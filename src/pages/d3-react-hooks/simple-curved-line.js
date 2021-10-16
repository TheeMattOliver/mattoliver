import React, { useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"
import DataToggleButton from "../../components/DataToggleButton"

import SimpleCurvedLineChart from "../../components/D3ReactHooks/SimpleCurvedLineChart"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

const numberOfDataPoints = 10,
  numberOfSeries = 3,
  maxY = 50,
  randomY = d3.randomUniform(0, maxY)

function generateData() {
  return d3.range(numberOfSeries).map(() => {
    return d3
      .range(numberOfDataPoints)
      .map((_, i) => ({ x: i, y: randomY(), name: "line-" + i }))
  })
}

export default function SimpleCurvedLinePage() {
  const [data, setData] = useState(generateData())

  return (
    <ChartPage
      title={`Simple curved line chart`}
      copy={copy}
      setData={setData}
      generateData={generateData}
    >
      <SimpleCurvedLineChart
        maxY={maxY}
        data={data}
        numberOfDataPoints={numberOfDataPoints}
      />
      <ButtonWrapper>
        <DataToggleButton onClick={() => setData(generateData())}>
          Update data
        </DataToggleButton>
      </ButtonWrapper>
    </ChartPage>
  )
}
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1.67rem;
  padding-bottom: 2rem;
  margin-top: 3rem;
`
