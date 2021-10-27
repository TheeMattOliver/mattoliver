import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import MapBubbleComponent from "../../components/D3ReactHooks/MapBubbleCensus/MapBubbleComponent"
import ChartPage from "../../templates/ChartPage"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function MapBubbleUSPopulationPage() {
  const [us, setUS] = useState("")
  useEffect(() => {
    d3.json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/counties-albers-10m.json`
    ).then(us => {
      setUS(us)
    })
  }, [])

  const [data, setData] = useState("")
  useEffect(() => {
    d3.json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/2016-acs-population.json`
    ).then(populationData => {
      setData(populationData)
    })
  }, [])

  return (
    <>
      {/* <ChartPage
        copy={copy}
        title={`Albers projection bubble map for estimated population, 2016`}
      > */}
      {!us && <h1>Loading...</h1>}
      <MapBubbleComponent data={data} us={us} />
      {/* </ChartPage> */}
    </>
  )
}
