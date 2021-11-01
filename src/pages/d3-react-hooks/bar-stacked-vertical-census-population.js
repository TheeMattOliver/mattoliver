import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"

import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"

import BarStackedVerticalCensusPopulation from "../../components/D3ReactHooks/BarStackedVerticalCensusPopulation"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function BarStackedVerticalCensusPage() {
  const [data, setData] = useState("")
  const [series, setSeries] = useState("")
  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/us-population-state-age.csv`
    ).then(data => {
      data.forEach((row, i, columns) => {
        row.total = +d3.sum(Object.values(row))
      })
      const series = d3
        .stack()
        .keys(data.columns.slice(1))(data)
        .map(d => (d.forEach(v => (v.key = d.key)), d))

      console.log("series: ", series)
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
