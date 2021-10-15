import React, { useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"
import UnstyledButton from "../../components/UnstyledButton"

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
const DataToggleButton = styled(UnstyledButton)`
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  position: relative;
  appearance: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  z-index: 0;
  text-align: center;
  text-decoration: none;
  line-height: 38px;
  white-space: nowrap;

  min-width: 200px;
  height: 50px;
  padding: 0px 25px;
  border-radius: 5px;
  font-size: 1rem;
  flex-shrink: 0;
  margin: 0px;
  color: var(--color-textWhite);
  background-color: var(--color-textPrimary);
  border: 1px solid var(--color-textPrimary);
  transition: all 0.2s ease 0s;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;

  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  &:hover {
    color: #000;
    background-color: #fff;
    border-color: #000;
  }
  display: inline-flex;
  flex: 1;

  @media ${QUERIES.tabletAndUp} {
    display: inline-block;
    flex: 0;
  }
`
