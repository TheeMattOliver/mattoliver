import React, { useState } from "react"
import styled from "styled-components"
import { range, randomUniform } from "d3"
import { Button } from "../../components/Button"

import SimpleCurvedLineChart from "../../components/D3React/SimpleCurvedLineChart"

const numberOfDataPoints = 10,
  numberOfSeries = 3,
  maxY = 50,
  randomY = randomUniform(0, maxY)

function generateData() {
  return range(numberOfSeries).map(() => {
    return range(numberOfDataPoints).map((_, i) => ({
      x: i,
      y: randomY(),
      name: "line-" + i,
    }))
  })
}

export default function SimpleCurvedLinePage() {
  const [data, setData] = useState(generateData())

  return (
    <>
      <SimpleCurvedLineChart
        maxY={maxY}
        data={data}
        numberOfDataPoints={numberOfDataPoints}
      />
      <ButtonWrapper>
        <Button
          variant="primary"
          size="medium"
          onClick={() => setData(generateData())}
        >
          Update data
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
