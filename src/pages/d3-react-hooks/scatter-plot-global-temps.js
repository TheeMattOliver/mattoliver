import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"
import DataToggleButton from "../../components/DataToggleButton"
import ScatterPlotGlobalTemps from "../../components/D3ReactHooks/ScatterGlobalTemps"
const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function ScatterPlotGlobalTempsPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    return Promise.all([
      d3.csv(
        `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/GLB.Ts+dSST.csv`
      ),
      d3.csv(
        `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/temperatures.csv`
      ),
    ]).then(([nasa, temperatures]) => {
      let data = []
      console.log("loadAndProcessData, nasa: ", nasa)
      console.log("loadAndProcessData, temperatures: ", temperatures)

      temperatures.forEach(d => {
        for (let i = 1; i < 13; ++i) {
          let columns = temperatures.columns

          data.push({
            date: new Date(Date.UTC(d.Year, i - 1, 1)),
            value: +d[columns[i]],
          })
        }
      })
      setData(data)
    })
  }, [])
  return (
    <ChartPage title={`Scatter plot of global temperatures`} copy={copy}>
      <ScatterPlotGlobalTemps data={data}></ScatterPlotGlobalTemps>
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
