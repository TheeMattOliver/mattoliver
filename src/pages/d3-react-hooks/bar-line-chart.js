import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"
import DataToggleButton from "../../components/DataToggleButton"
import BarLineChart from "../../components/D3ReactHooks/BarLineChart"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function BarLineChartPage() {
  const [csvData, setCsvData] = useState("")
  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/new-passenger-cars.csv`
    ).then(csvData => {
      setCsvData(csvData)
    })
  }, [])
  return (
    <ChartPage title={`Dual bar & line chart`} copy={copy}>
      <BarLineChart data={csvData} />
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
