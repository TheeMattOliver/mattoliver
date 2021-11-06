/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"
import RadialAreaChartSFO from "../../components/D3ReactHooks/RadialAreaChartSFO"
const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function RadialAreaChartSFOPage() {
  const [data, setData] = useState()

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/sfo-temperature.csv`
    ).then(data => {
      let processedData = Array.from(
        d3.rollup(
          data,
          v => ({
            date: new Date(Date.UTC(2000, new Date(v[0].DATE).getUTCMonth(), new Date(v[0].DATE).getUTCDate())),
            avg: d3.mean(v, d => d.TAVG || NaN),
            min: d3.mean(v, d => d.TMIN || NaN),
            max: d3.mean(v, d => d.TMAX || NaN),
            minmin: d3.min(v, d => d.TMIN || NaN),
            maxmax: d3.max(v, d => d.TMAX || NaN),
          }),
          d => `${new Date(d.DATE).getUTCMonth()}-${new Date(d.DATE).getUTCDate()}`
        ).values()
      ).sort((a, b) => d3.ascending(a.date, b.date))
      setData(processedData)
    })
  }, [])
  return (
    <>
      <RadialAreaChartSFO data={data} />
    </>
  )
}
