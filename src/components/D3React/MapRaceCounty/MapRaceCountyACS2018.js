import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"

import { QUERIES } from "../../../constants"

export default function MapRaceCountyACS2018({
  allData,
  us,
  total,
  data,
  variable,
}) {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!dimensions) return
    if (!us) return
    if (!variable) return
    if (!data) return

    // remove groups in case a resize is triggered
    d3.selectAll("g").remove()

    const svg = d3.select(svgRef.current)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const margin = { top: -20, right: 30, bottom: -20, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    const colorScale = d3.scaleSequential(
      [0, d3.quantile(data.values(), 0.999)],
      d3.interpolateYlGnBu
    )
    const format = colorScale.tickFormat(5, "%")
    const states = new Map(
      us.objects.states.geometries.map(d => [d.id, d.properties])
    )
    const path = d3.geoPath()

    svg
      .append("g")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .join("path")
      .attr("fill", d => colorScale(data.get(d.id)))
      .attr("d", path)
      .attr("class", "county")
      .append("title")
      .text(
        d => `${d.properties.name}, ${states.get(d.id.slice(0, 2)).name}
${format(data.get(d.id))}`
      )

    svg
      .append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-linejoin", "round")
      .attr("d", path)
  }, [us, allData, variable, data, dimensions])

  const svgStyles = { overflow: "visible" }

  return (
    <>
      <RefWrapper ref={wrapperRef}>
        <SVG ref={svgRef} style={svgStyles}></SVG>
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
    .county:hover {
      stroke: black;
      stroke-width: 1px;
      cursor: pointer;
      filter: brightness(0.7);
    }
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
