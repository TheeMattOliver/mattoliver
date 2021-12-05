import React, { useState, useEffect } from "react"
import { csv } from "d3"
import ScatterPlotLineInequality from "../../components/D3React/ScatterPlotLineInequality"

export default function ScatterPlotLineInequalityPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/metros.csv`
    ).then(csvData => {
      setData([...csvData, { x: "Population →", y: "↑ Inequality" }])
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <ScatterPlotLineInequality data={data} />
    </>
  )
}
