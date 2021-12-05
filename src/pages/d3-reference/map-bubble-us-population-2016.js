import React, { useState, useEffect } from "react"
import { json } from "d3"
import * as topojson from "topojson-client"
import MapBubbleComponent from "../../components/D3React/MapBubbleCensus/MapBubbleComponent"

export default function MapBubbleUSPopulationPage() {
  const [us, setUS] = useState("")
  useEffect(() => {
    json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/counties-albers-10m.json`
    ).then(us => {
      setUS(us)
    })
  }, [])

  const [data, setData] = useState("")
  useEffect(() => {
    json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/2016-acs-population.json`
    ).then(populationData => {
      setData(populationData)
    })
  }, [])

  return (
    <>
      {!us && <h1>Loading...</h1>}
      <MapBubbleComponent data={data} us={us} />
    </>
  )
}
