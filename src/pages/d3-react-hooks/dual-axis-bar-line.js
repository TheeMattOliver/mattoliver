import React, { useState, useEffect } from "react"
import { csv } from "d3"
import BarLineChartFuelCars from "../../components/D3ReactHooks/BarLineChartFuelCars"

export default function BarLineChartPage() {
  const [csvData, setCsvData] = useState("")
  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/new-passenger-cars.csv`
    ).then(csvData => {
      setCsvData(csvData)
    })
  }, [])
  return <BarLineChartFuelCars data={csvData} />
}
