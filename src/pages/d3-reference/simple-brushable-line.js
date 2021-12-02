import React, { useState } from "react"
import styled from "styled-components"

import DataToggleButton from "../../components/DataToggleButton"

import SimpleBrushChart from "../../components/D3ReactHooks/SimpleBrushChart"
import SimpleBrushChartChild from "../../components/D3ReactHooks//SimpleBrushChart/SimpleBrushChartChild"

export default function SimpleBrushableLinePage() {
  const [data, setData] = useState(
    Array.from({ length: 30 }).map(() => Math.round(Math.random() * 100))
  )
  const onAddDataClick = () =>
    setData([...data, Math.round(Math.random() * 100)])

  return (
    <>
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
    </>
  )
}
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1.67rem;
  padding-bottom: 2rem;
  margin-top: 3rem;
`
