import React, { useState, useEffect } from "react"
import { tsv, timeParse } from "d3"
import BandChartWeather from "../../components/D3ReactHooks/BandChartWeather"

export default function BandChartWeatherPage() {
  const [data, setData] = useState("")
  const parseDate = timeParse("%Y%m%d")

  useEffect(() => {
    tsv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/sf-weather.tsv`
    ).then(tsvData => {
      // console.log("tsvData: ", tsvData)
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
