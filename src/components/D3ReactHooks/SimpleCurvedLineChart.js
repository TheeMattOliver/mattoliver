import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"

import useResizeObserver from "../../hooks/useResizeObserver"
import { BREAKPOINTS, QUERIES } from "../../constants"
import { ThemeContext } from "../ThemeContext"
import UnstyledButton from "../UnstyledButton"

function SimpleCurvedLineChart({ data, maxY, numberOfDataPoints }) {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!dimensions) return

    const svg = d3.select(svgRef.current)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 10, right: 10, bottom: 50, left: 20 },
      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom,
      dotRadius = 2

    const xScale = d3
      .scaleLinear()
      .domain([0, numberOfDataPoints - 1])
      .range([0, innerWidth])

    const yScale = d3.scaleLinear().domain([0, maxY]).range([height, 0])

    const colorScale = d3.schemeCategory10

    const xAxis = d3.axisBottom(xScale).ticks(5)
    svg
      .select(".x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      // .style("stroke", "red")
      .call(g =>
        g
          .selectAll(".x-axis path")
          .attr("stroke-opacity", `${colorMode === "dark" ? 0.5 : ""}`)
          .attr("stroke-dasharray", `${colorMode === "dark" ? "(2, 2)" : ""}`)
          .style("stroke", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
      )
      .call(g =>
        g
          .selectAll(".x-axis line")
          .attr("stroke-opacity", `${colorMode === "dark" ? 0.5 : ""}`)
          .attr("stroke-dasharray", `${colorMode === "dark" ? "(2, 2)" : ""}`)
          .style("stroke", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
      )
      .call(g =>
        g
          .selectAll(".x-axis text")
          .style("color", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
      )

    const yAxis = d3.axisLeft(yScale).ticks(5)
    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.left - 20},0)`)
      .call(yAxis)
      .call(g =>
        g
          .selectAll(".y-axis path")
          .attr("stroke-opacity", `${colorMode === "dark" ? 0.5 : ""}`)
          .attr("stroke-dasharray", `${colorMode === "dark" ? "(2, 2)" : ""}`)
          .style("stroke", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
      )
      .call(g =>
        g
          .selectAll(".y-axis line")
          .attr("stroke-opacity", `${colorMode === "dark" ? 0.5 : ""}`)
          .attr("stroke-dasharray", `${colorMode === "dark" ? "(2, 2)" : ""}`)
          .style("stroke", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
      )
      .call(g =>
        g
          .selectAll(".y-axis text")
          .style("color", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
      )

    function renderLines(data) {
      const line = d3
        .line()
        .curve(d3.curveNatural)
        .x(d => xScale(d.x))
        .y(d => yScale(d.y))

      const zeroLine = d3
        .line()
        .x(d => xScale(d.x))
        .y(yScale(0))

      svg
        .selectAll("path.line")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", (_, i) => colorScale[i])
        .attr("d", zeroLine)

      svg
        .selectAll("path.line")
        .data(data)
        .transition()
        .duration(500)
        .attr("d", line)
    }

    function renderDots(data) {
      data.forEach((dataPoints, i) => {
        svg
          .selectAll("circle.dot_" + i)
          .data(dataPoints)
          .enter()
          .append("circle")
          .attr("class", "dot_" + i)
          .attr("cx", d => xScale(d.x))
          .attr("cy", yScale(0))
          .attr("r", 0)
          .attr("stroke", colorScale[i])
          .attr("fill", colorScale[i])

        svg
          .selectAll("circle.dot_" + i)
          .data(dataPoints)
          .transition()
          .duration(500)
          .attr("cx", d => xScale(d.x))
          .attr("cy", d => yScale(d.y))
          .attr("r", dotRadius)
      })
    }
    renderLines(data)
    renderDots(data)
  }, [data, dimensions, colorMode])

  const svgStyles = {
    overflow: "visible",
  }

  return (
    <>
      <RefWrapper ref={wrapperRef}>
        <SVG style={svgStyles} ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </SVG>
      </RefWrapper>
    </>
  )
}

const RefWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  margin-bottom: 2rem;
  svg {
    flex: 1;
    height: 350px;
    &.x-axis {
      stroke: red;
    }
  }
  @media ${QUERIES.tabletAndUp} {
    width: 800px;
    height: 488px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
// .full-height-percentage-wrapper {
//   font-family: sans-serif;
//   height: 100%;
//   min-height: 100%;
//   width: 100%;
// }

export default SimpleCurvedLineChart
