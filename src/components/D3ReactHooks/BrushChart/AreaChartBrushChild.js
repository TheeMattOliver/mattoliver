/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"

import useResizeObserver from "../../../hooks/useResizeObserver"
import usePrevious from "../../../hooks/usePrevious"
import { BREAKPOINTS, QUERIES } from "../../../constants"
import { ThemeContext } from "../../ThemeContext"
import UnstyledButton from "../../UnstyledButton"

function AreaChartStockBrushChild({ data, selection, rectWidth }) {
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

    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    const xScale = d3
      .scaleUtc()
      .domain(selection)
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.close)])
      .range([innerHeight - margin.bottom, margin.top])

    // axes
    const xAxis = d3.axisBottom(xScale)

    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${innerHeight - margin.bottom})`)
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
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
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

    const area = d3
      .area()
      // .defined(d => !isNaN(d.close))
      .x(d => xScale(d.date))
      .y0(d => yScale(0))
      .y1(d => yScale(d.close))

    content
      .selectAll(".areaChart")
      .data([data])
      .join("path")
      .attr("class", "areaChart")
      .attr("fill", "steelblue")
      .attr("d", area)
  }, [data, selection, rectWidth, colorMode])

  const svgStyles = {
    overflow: "visible",
  }

  return (
    <>
      <RefWrapper ref={wrapperRef}>
        <SVG style={svgStyles} ref={svgRef}>
          <defs>
            <clipPath id="chartClipPath">
              <rect x={40} y="0" width={rectWidth} height="400px"></rect>
            </clipPath>
          </defs>
          <g className="content" clipPath="url(#chartClipPath)" />
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
  height: 450px;
  svg {
    flex: 1;
  }

  @media ${QUERIES.tabletAndUp} {
    flex-direction: column;
    height: 450px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`

export default AreaChartStockBrushChild
