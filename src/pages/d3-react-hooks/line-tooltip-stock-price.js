import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import LineTooltipStockPrice from "../../components/D3ReactHooks/LineTooltipStockPrice"
import ChartPage from "../../templates/ChartPage"

export default function LineTooltipStockPricePage() {
  const [data, setData] = useState("")
  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/aapl-bollinger.csv`
    ).then(csvData => {
      let processedData = []
      csvData.forEach(row => {
        // console.log("new Date(row.date): ", new Date(row.date))
        processedData.push({
          date: new Date(row.date),
          close: +row.close,
          lower: +row.lower,
          middle: +row.middle,
          upper: +row.upper,
        })
      })
      setData(processedData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <LineTooltipStockPrice data={data} />
    </>
  )
}
