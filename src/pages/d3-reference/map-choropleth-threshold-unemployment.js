import React, { useState, useEffect } from "react"
import { csv, json } from "d3"
import * as topojson from "topojson-client"
import MapChoroplethThresholdUnemployment from "../../components/D3React/MapChoroplethThresholdUnemployment"

export default function MapChoroplethThresholdUnemploymentPage() {
  const [data, setData] = useState("")
  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/unemployment-x.csv`
    ).then(unemploymentData => {
      setData(
        new Map(unemploymentData.map(county => [county.id, +county.rate]))
      )
    })
  }, [])

  const [us, setUS] = useState("")
  useEffect(() => {
    json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/counties-albers-10m.json`
    ).then(us => {
      setUS(us)
    })
  }, [])

  return (
    <>
      <MapChoroplethThresholdUnemployment data={data} us={us} />
    </>
  )
}
