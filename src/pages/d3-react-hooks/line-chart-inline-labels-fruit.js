import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import LineChartInlineLabelsFruit from "../../components/D3ReactHooks/LineChartInlineLabelsFruit"
import ChartPage from "../../templates/ChartPage"

export default function LineChartInlineLabelsPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/fruit.csv`
    ).then(csvData => {
      setData(csvData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <LineChartInlineLabelsFruit data={data} />
    </>
  )
}
