import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import MapBubbleUSPopulation2016 from "../../components/D3ReactHooks/MapBubbleUSPopulation2016"
import ChartPage from "../../templates/ChartPage"
import { setHours } from "date-fns"

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

  // useEffect(() => {
  //   let isSubscribed = true

  //   d3.json(
  //     `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/counties-albers-10m.json`
  //   ).then(us => {
  //     setUS(us)

  //     d3.json(
  //       `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/2016-acs-population.json`
  //     ).then(populationData => {
  //       const path = d3.geoPath()
  //       const features = new Map(
  //         topojson.feature(us, us.objects.counties).features.map(d => [d.id, d])
  //       )

  //       const mutated = populationData
  //         .slice(1)
  //         .map(([population, state, county]) => {
  //           const id = state + county
  //           const feature = features.get(id)
  //           return {
  //             id,
  //             position: feature && path.centroid(feature),
  //             title: feature && feature.properties.name,
  //             value: +population,
  //           }
  //         })
  //       console.log("mutated: ", mutated)

  //       setData(mutated)
  //     })
  //   })
  //   return () => (isSubscribed = false)
  // }, [])

  return (
    <>
      {/* <ChartPage
        copy={copy}
        title={`Albers projection bubble map for estimated population, 2016`}
      > */}
      {!us && <h1>Loading...</h1>}
      <MapBubbleUSPopulation2016 data={data} us={us} />
      {/* </ChartPage> */}
    </>
  )
}
