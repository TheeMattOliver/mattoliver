import React, { useState, useEffect } from "react"
import { csv, sum } from "d3"

import BarNormalizedCensus from "../../components/D3React/BarNormalizedCensus"

export default function BarNormalizedCensusPage() {
  const [censusData, setCensusData] = useState([])
  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/us-population-state-age.csv`
    )
      .then(csvData => {
        csvData.forEach(d => {
          let columns = csvData.columns

          d.total = sum(columns, c => d[c])

          censusData.push(d.total)
          censusData.push(columns)
        })
        setCensusData(
          csvData.sort((a, b) => b["<10"] / b.total - a["<10"] / a.total)
        )
      })
      .catch(error => {
        return error
        // console.log("error: ", error)
      })
  }, [])
  return <BarNormalizedCensus data={censusData} />
}
