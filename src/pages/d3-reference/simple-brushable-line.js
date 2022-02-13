import React, { useState } from "react"
import styled from "styled-components"

import { Button } from "../../components/Button"

import SimpleBrushChart from "../../components/D3React/SimpleBrushChart"
import SimpleBrushChartChild from "../../components/D3React//SimpleBrushChart/SimpleBrushChartChild"

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
        <Button
          variant="primary"
          size="medium"
          onClick={() => setData(onAddDataClick)}
        >
          Add data
        </Button>
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
