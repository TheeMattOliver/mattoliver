import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import MapUSCapitals from "../../components/D3ReactHooks/MapUSCapitals"
import ChartPage from "../../templates/ChartPage"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function MapCapitalsPage() {
  const [us, setUS] = useState("")
  useEffect(() => {
    d3.json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/states-albers-10m.json`
    ).then(topoJsonData => {
      setUS(topoJsonData)
    })
  }, [])

  const [cities, setCities] = useState("")
  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/us-state-capitals.csv`
    ).then(csvData => {
      setCities(csvData)
    })
  }, [])

  return (
    <>
      <ChartPage
        copy={copy}
        title={`Albers projection and geocoded points on a map`}
      >
        {!us && <h1>Loading...</h1>}

        <MapUSCapitals cities={cities} us={us} />
      </ChartPage>
    </>
  )
}
