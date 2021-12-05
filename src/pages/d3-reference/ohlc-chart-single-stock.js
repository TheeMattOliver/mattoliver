import React, { useState, useEffect } from "react"
import { csv, timeParse } from "d3"
import OpenHighLowCloseSingleStock from "../../components/D3React/OpenHighLowCloseSingleStock"

const parseDate = timeParse("%Y-%m-%d")

export default function OpenHighLowCloseSingleStockPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/aapl_three.csv`
    ).then(csvData => {
      let processedData = []
      csvData.forEach(row => {
        processedData.push({
          date: parseDate(row["Date"]),
          high: +row["High"],
          low: +row["Low"],
          open: +row["Open"],
          close: +row["Close"],
        })
      })

      setData(processedData.slice(-90))
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <OpenHighLowCloseSingleStock data={data} />
    </>
  )
}
