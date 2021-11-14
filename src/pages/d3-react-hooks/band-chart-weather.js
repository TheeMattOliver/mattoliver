import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import BandChartWeather from "../../components/D3ReactHooks/BandChartWeather"
import ChartPage from "../../templates/ChartPage"

export default function BandChartWeatherPage() {
  const [data, setData] = useState("")
  const parseDate = d3.timeParse("%Y%m%d")

  useEffect(() => {
    d3.tsv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/sf-weather.tsv`
    ).then(tsvData => {
      console.log("tsvData: ", tsvData)
      let processedData = Object.assign(
        tsvData.map(({ date, high, low }) => ({
          date: parseDate(date),
          high: +high,
          low: +low,
        }))
      )
      setData(processedData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <BandChartWeather data={data} />
    </>
  )
}
