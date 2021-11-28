import React, { useState, useEffect } from "react"
import { csv } from "d3"
import LineChartInlineLabelsFruit from "../../components/D3ReactHooks/LineChartInlineLabelsFruit"

export default function LineChartInlineLabelsPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/fruit.csv`
    ).then(csvData => {
      let processedData = []
      csvData.forEach(row => {
        processedData.push({
          Apples: +row.Apples,
          Bananas: +row.Bananas,
          date: new Date(row.date),
        })
      })
      setData(processedData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <LineChartInlineLabelsFruit data={data} />
    </>
  )
}
