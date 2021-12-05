import React, { useState, useEffect } from "react"
import { csv } from "d3"
import AreaChartStockPrice from "../../components/D3React/AreaChartStockPrice"

export default function AreaChartStockPricePage() {
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
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
