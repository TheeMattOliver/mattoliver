/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import * as d3 from "d3"

import RadialAreaChartSFO from "../../components/D3ReactHooks/RadialAreaChartSFO"

export default function RadialAreaChartSFOPage() {
  const [data, setData] = useState()

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/sfo-temperature.csv`
    ).then(data => {
      let processedData = Array.from(
        d3
          .rollup(
            data,
            v => ({
              date: new Date(
                Date.UTC(
                  2000,
                  new Date(v[0].DATE).getUTCMonth(),
                  new Date(v[0].DATE).getUTCDate()
                )
              ),
              avg: d3.mean(v, d => d.TAVG || NaN),
              min: d3.mean(v, d => d.TMIN || NaN),
              max: d3.mean(v, d => d.TMAX || NaN),
              minmin: d3.min(v, d => d.TMIN || NaN),
              maxmax: d3.max(v, d => d.TMAX || NaN),
            }),
            d =>
              `${new Date(d.DATE).getUTCMonth()}-${new Date(
                d.DATE
              ).getUTCDate()}`
          )
          .values()
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
