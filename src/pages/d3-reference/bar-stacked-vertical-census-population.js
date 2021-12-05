import React, { useState, useEffect } from "react"
import { csv, stack, keys, sum } from "d3"

import BarStackedVerticalCensusPopulation from "../../components/D3React/BarStackedVerticalCensusPopulation"

export default function BarStackedVerticalCensusPage() {
  const [data, setData] = useState("")
  const [series, setSeries] = useState("")
  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/us-population-state-age.csv`
    ).then(data => {
      data.forEach((row, i, columns) => {
        row.total = +sum(Object.values(row))
      })
      const series = stack()
        .keys(data.columns.slice(1))(data)
        .map(d => (d.forEach(v => (v.key = d.key)), d))

      // console.log("series: ", series)
      setData(data)
      setSeries(series)
    })
  }, [])

  return (
    <>
      <BarStackedVerticalCensusPopulation data={data} series={series} />
    </>
  )
}
