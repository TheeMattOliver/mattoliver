import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import ScatterPlotLineInequality from "../../components/D3ReactHooks/ScatterPlotLineInequality"
import ChartPage from "../../templates/ChartPage"

export default function ScatterPlotLineInequalityPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/metros.csv`
    ).then(csvData => {
      setData([...csvData, { x: "Population →", y: "↑ Inequality" }])
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <ScatterPlotLineInequality data={data} />
    </>
  )
}
