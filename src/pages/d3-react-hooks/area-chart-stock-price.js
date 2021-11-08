import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import AreaChartStockPrice from "../../components/D3ReactHooks/AreaChartStockPrice"
import ChartPage from "../../templates/ChartPage"

export default function AreaChartStockPricePage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/aapl_two.csv`
    ).then(csvData => {
      let processedData = []
      csvData.forEach(row => {
        processedData.push({
          date: new Date(row.date),
          close: +row.close,
        })
      })
      setData(processedData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <AreaChartStockPrice data={data} />
    </>
  )
}
