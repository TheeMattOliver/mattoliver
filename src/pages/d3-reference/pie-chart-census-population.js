import React, { useState, useEffect } from "react"
import { csv } from "d3"
import PieChartCensusPopulation from "../../components/D3React/PieChartCensusPopulation"

export default function PieChartCensusPopulationPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/population-by-age.csv`
    ).then(csvData => {
      setData(csvData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <PieChartCensusPopulation data={data} />
    </>
  )
}
