import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import AreaBrushStockParent from "../../components/D3ReactHooks/AreaChartBrushingStockPrice/AreaBrushStockParent"
import ChartPage from "../../templates/ChartPage"

export default function AreaChartBrushingStockPricePage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/aapl.csv`
    ).then(csvData => {
      let processedData = []
      csvData.forEach(row => {
        processedData.push({
          date: new Date(row.date),
          close: +row.close,
        })
      })
      processedData.push({ y: "↑ Close $" })
      setData(processedData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <AreaBrushStockParent data={data} />
    </>
  )
}
