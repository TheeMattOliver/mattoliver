import React, { useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"
import DataToggleButton from "../../components/DataToggleButton"

import SimpleBrushChart from "../../components/D3ReactHooks/SimpleBrushChart"
import SimpleBrushChartChild from "../../components/D3ReactHooks/SimpleBrushChartChild"
const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function SimpleBrushableLinePage() {
  const [data, setData] = useState(
    Array.from({ length: 30 }).map(() => Math.round(Math.random() * 100))
  )
  const onAddDataClick = () =>
    setData([...data, Math.round(Math.random() * 100)])

  return (
    <ChartPage title={`Simple brushable line chart`} copy={copy}>
      <SimpleBrushChart data={data}>
        {selection => (
          <SimpleBrushChartChild data={data} selection={selection} />
        )}
      </SimpleBrushChart>
      <ButtonWrapper>
        <DataToggleButton onClick={() => setData(onAddDataClick)}>
          Add data
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
