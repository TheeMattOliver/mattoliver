import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"

import useResizeObserver from "../../hooks/useResizeObserver"
import usePrevious from "../../hooks/usePrevious"
import { BREAKPOINTS, QUERIES } from "../../constants"
import { ThemeContext } from "../ThemeContext"
import UnstyledButton from "../UnstyledButton"

function SimpleBrushChartChild({ data, selection, id = "brushClipPath" }) {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!dimensions) return

    const svg = d3.select(svgRef.current)
    const content = svg.select(".content")

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 10, right: 10, bottom: 50, left: 20 },
      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom,
      dotRadius = 2

    // scales + line generator
    const xScale = d3.scaleLinear().domain(selection).range([0, width])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([height - 10, 10])

    const lineGenerator = d3
      .line()
      .x((d, index) => xScale(index))
      .y(d => yScale(d))
      .curve(d3.curveCardinal)

    // render the line
    content
      .selectAll(".myLine")
      .data([data])
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", `${colorMode === "dark" ? "#F2F2F2" : "#000000"}`)
      .attr("fill", "none")
      .attr("d", lineGenerator)

    content
      .selectAll(".myDot")
      .data(data)
      .join("circle")
      .attr("class", "myDot")
      .attr("stroke", `${colorMode === "dark" ? "#F2F2F2" : "#000000"}`)
      .attr("r", (value, index) =>
        index >= selection[0] && index <= selection[1] ? 4 : 2
      )
      .attr("fill", (value, index) =>
        index >= selection[0] && index <= selection[1] ? "#ff7f0e" : "#000000"
      )
      .attr("cx", (value, index) => xScale(index))
      .attr("cy", yScale)

    // axes
    const xAxis = d3.axisBottom(xScale)
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height - 5})`)
      .call(xAxis)
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

    const yAxis = d3.axisLeft(yScale)
    svg
      .select(".y-axis")
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
  }, [data, selection, dimensions, colorMode])

  const svgStyles = {
    overflow: "visible",
  }

  return (
    <>
      <RefWrapper ref={wrapperRef}>
        <SVG style={svgStyles} ref={svgRef}>
          <defs>
            <clipPath id={id}>
              <rect x="0" y="0" width="800px" height="400px" />
            </clipPath>
          </defs>
          <g className="content" clipPath="url(#brushClipPath)" />
          <g className="x-axis" />
          <g className="y-axis" />
        </SVG>
      </RefWrapper>
      {/* <small>
        Selected values: [
        {data
          .filter(
            (value, index) => index >= selection[0] && index <= selection[1]
          )
          .join(", ")}
        ]
      </small> */}
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
    height: 150px;
  }
  @media ${QUERIES.tabletAndUp} {
    width: 800px;
    height: 150px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
export default SimpleBrushChartChild
