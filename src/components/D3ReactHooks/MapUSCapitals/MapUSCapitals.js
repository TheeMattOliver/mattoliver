import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"

import { QUERIES } from "../../../constants"

export default function MapUSCapitals({ cities, us }) {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!dimensions) return
    d3.selectAll("g").remove()
    d3.selectAll("d").remove()
    d3.selectAll("path").remove()
    if (!us) return
    const svg = d3.select(svgRef.current)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const margin = { top: -20, right: 30, bottom: -20, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    const projection = d3
      .geoAlbersUsa()
      .scale(1300)
      .translate([innerWidth / 2, innerHeight / 2])
    const path = d3.geoPath().projection(projection)

    const stateFills = svg
      .append("path")
      .attr("fill", "#ddd")
      .attr("d", path(topojson.feature(us, us.objects.nation)))

    const stateBorders = svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", path(topojson.mesh(us, us.objects.states, (a, b) => a !== b)))

    svg
      .selectAll("g")
      .data(cities)
      .join(
        // pass in enter, update, and exit callbacks
        // use 'enter' for every new piece of data that needs to be represented in the svg
        enter =>
          enter
            .append("g")
            .attr(
              "transform",
              ({ longitude, latitude }) =>
                `translate(${projection([longitude, latitude]).join(",")})`
            )
            .append("circle")
            .attr("r", 2),
        update => update.join("circle").attr("r", 2).style("cursor", "pointer"),
        exit => exit.remove()
      )

    svg
      .selectAll("g")
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("y", -6)
      .text(({ description }) => description)
  }, [us, cities, dimensions])

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
    path {
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
