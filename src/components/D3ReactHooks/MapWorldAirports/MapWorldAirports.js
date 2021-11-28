import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"

import { QUERIES } from "../../../constants"

export default function MapUSCapitals({ data, world }) {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!dimensions) return
    d3.selectAll("g").remove()
    d3.selectAll("d").remove()
    d3.selectAll("path").remove()
    if (!world) return
    const svg = d3.select(svgRef.current)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const margin = { top: -20, right: 30, bottom: -20, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    const land = topojson.feature(world, world.objects.land)
    const graticule = d3.geoGraticule10()
    const outline = { type: "Sphere" }
    const projection = d3.geoNaturalEarth1()
    const path = d3.geoPath(projection)

    const defs = svg.append("defs")

    defs.append("path").attr("id", "outline").attr("d", path(outline))

    defs
      .append("clipPath")
      .attr("id", "clip")
      .append("use")
      .attr("xlink:href", new URL("#outline", window.location))

    const g = svg
      .append("g")
      .attr("clip-path", `url(${new URL("#clip", window.location)})`)

    g.append("use")
      .attr("xlink:href", new URL("#outline", window.location))
      .attr("fill", "#fff")

    g.append("path")
      .attr("d", path(graticule))
      .attr("stroke", "#ddd")
      .attr("fill", "none")

    g.append("path").attr("d", path(land)).attr("fill", "#ddd")

    svg
      .append("use")
      .attr("xlink:href", new URL("#outline", window.location))
      .attr("stroke", "#000")
      .attr("fill", "none")

    svg
      .append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr(
        "transform",
        d => `translate(${projection([d.longitude, d.latitude])})`
      )
      .attr("r", 1.5)
      .append("title")
      .text(d => d.name)
  }, [data, world, dimensions])

  return (
    <>
      <RefWrapper ref={wrapperRef}>
        <SVG ref={svgRef}></SVG>
      </RefWrapper>
    </>
  )
}

const RefWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  height: 450px;
  svg {
    flex: 1;
  }
  @media ${QUERIES.tabletAndUp} {
    flex-direction: column;
    height: 688px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
