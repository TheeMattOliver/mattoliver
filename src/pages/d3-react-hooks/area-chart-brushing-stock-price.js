import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import AreaChartStockBrush from "../../components/D3ReactHooks/AreaChartBrushStockPrice/AreaChartStockBrush"

import ChartPage from "../../templates/ChartPage"
import AreaChartStockBrushChild from "../../components/D3ReactHooks/AreaChartBrushStockPrice/AreaChartStockBrushChild"

export default function AreaChartBrushingStockPricePage() {
  // const [data, setData] = useState("")

  const [data, setData] = useState(
    Array.from({ length: 30 }).map(() => Math.round(Math.random() * 100))
  )
  const onAddDataClick = () =>
    setData([...data, Math.round(Math.random() * 100)])

  // useEffect(() => {
  //   d3.csv(
  //     `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/aapl.csv`
  //   ).then(csvData => {
  //     let processedData = []
  //     csvData.forEach(row => {
  //       processedData.push({
  //         date: new Date(row.date),
  //         close: +row.close,
  //       })
  //     })
  //     // processedData.push({ y: "↑ Close $" })
  //     setData(processedData)
  //   })
  // }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}
      <AreaChartStockBrush data={data}>
        {/* {selection => <h1>hello, {selection.join(", ")}</h1>} */}
        {selection => (
          <AreaChartStockBrushChild data={data} selection={selection} />
        )}
      </AreaChartStockBrush>
    </>
  )
}
