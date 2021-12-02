import React, { useState, useEffect } from "react"
import { csv } from "d3"

import AreaChartBrush from "../../components/D3ReactHooks/BrushChart/AreaChartBrush"
import AreaChartBrushChild from "../../components/D3ReactHooks/BrushChart/AreaChartBrushChild"

export default function AreaChartBrushingStockPricePage() {
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/aapl.csv`
    ).then(csvData => {
      let processedData = []
      csvData.forEach(row => {
        processedData.push({
          date: new Date(row.date),
          close: +row.close,
        })
      })
      // processedData.push({ y: "↑ Close $" })
      setData(processedData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}
      <AreaChartBrush data={data}>
        {selection => <AreaChartBrushChild data={data} selection={selection} />}
      </AreaChartBrush>
    </>
  )
}
