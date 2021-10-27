import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import MapBubbleUSPopulation2016 from "./MapBubbleUSPopulation2016"

export default function MapBubbleComponent({ data, us }) {
  const [mutated, setMutated] = useState("")

  useEffect(() => {
    if (!us) return
    const path = d3.geoPath()
    const features = new Map(
      topojson.feature(us, us.objects.counties).features.map(d => [d.id, d])
    )
    const preppedData = data.slice(1).map(([population, state, county]) => {
      const id = state + county
      const feature = features.get(id)
      return {
        id,
        position: feature && path.centroid(feature),
        title: feature && feature.properties.name,
        value: +population,
      }
    })
    setMutated(preppedData)
  }, [data, us])
  return (
    <>
      <MapBubbleUSPopulation2016 data={data} us={us} mutated={mutated} />
    </>
  )
}
