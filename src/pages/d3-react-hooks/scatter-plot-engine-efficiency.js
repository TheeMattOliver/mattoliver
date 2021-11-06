import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import ScatterFuelEfficiency from "../../components/D3ReactHooks/ScatterFuelEfficiency"
import ChartPage from "../../templates/ChartPage"

export default function ScatterPlotEfficiencyPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/mtcars.csv`
    ).then(csvData => {
      let processedArray = []
      csvData.forEach(row => {
        // ({name, mpg: x, hp: y}) => ({name, x: +x, y: +y})), {x: "Miles per gallon →", y: "↑ Horsepower"})
        processedArray.push({
          name: row.name,
          x: +row.mpg,
          y: +row.hp,
        })
      })
      processedArray.push({ x: "Miles per gallon →", y: "↑ Horsepower" })
      setData(processedArray)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <ScatterFuelEfficiency data={data} />
    </>
  )
}
