import React, { useState, useEffect } from "react"
import { csv } from "d3"
import LineTooltipStockPrice from "../../components/D3React/LineTooltipStockPrice"

export default function LineTooltipStockPricePage() {
  const [data, setData] = useState("")
  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/aapl-bollinger.csv`
    ).then(csvData => {
      let processedData = []
      csvData.forEach(row => {
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
