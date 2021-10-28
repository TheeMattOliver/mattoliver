import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import MapChoroplethThresholdUnemployment from "../../components/D3ReactHooks/MapChoroplethThresholdUnemployment"
import ChartPage from "../../templates/ChartPage"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function MapChoroplethThresholdUnemploymentPage() {
  const [data, setData] = useState("")
  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/unemployment-x.csv`
    ).then(unemploymentData => {
      setData(
        new Map(unemploymentData.map(county => [county.id, +county.rate]))
      )
    })
  }, [])

  const [us, setUS] = useState("")
  useEffect(() => {
    d3.json(
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
