import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

export default function MapChoroplethUSPopulationDensity({ data, us }) {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  const format = d3.format("")

  useEffect(() => {
    if (!dimensions) return
    if (!us) return
    if (!data) return

    // remove paths and groups in case a resize is triggered
    d3.selectAll("g").remove()
    d3.selectAll("d").remove()

    const svg = d3.select(svgRef.current)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const margin = { top: -20, right: 30, bottom: -20, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    const path = d3.geoPath()

    const colorScale = d3
      .scaleThreshold()
      .domain([2, 4, 6, 8, 10])
      .range(d3.schemePurples[6])

    const legend = g => {
      const width = 260
      const length = colorScale.range().length

      const x = d3
        .scaleLinear()
        .domain([1, length - 1])
        .rangeRound([width / length, (width * (length - 1)) / length])

      g.selectAll("rect")
        .data(colorScale.range())
        .join("rect")
        .attr("height", 8)
        .attr("x", (d, i) => x(i))
        .attr("width", (d, i) => x(i + 1) - x(i))
        .attr("fill", d => d)

      g.append("text")
        .attr("y", -6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Unemployment rate (%)")

      g.call(
        d3
          .axisBottom(x)
          .tickSize(13)
          .tickFormat(i => colorScale.domain()[i - 1])
          .tickValues(d3.range(1, length))
      )
        .select(".domain")
        .remove()
    }

    svg.append("g").attr("transform", "translate(600,40)").call(legend)

    svg
      .append("g")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .join("path")
      .attr("fill", d => colorScale(data.get(d.id)))
      .attr("d", path)
      .attr("class", "county")
      .append("title")
      .text(d => format(data.get(d.id)))

    svg
      .append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path)
  }, [us, data, dimensions])

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
  /* height: 450px; */
  svg {
    flex: 1;
  }
  .county:hover {
    stroke: black;
    stroke-width: 1px;
    cursor: pointer;
    filter: brightness(0.7);
  }
  @media ${QUERIES.tabletAndUp} {
    flex-direction: column;
    /* height: 688px; */
  }
`
const SVG = styled.svg`
  display: "block";
  width: "100%";
`
