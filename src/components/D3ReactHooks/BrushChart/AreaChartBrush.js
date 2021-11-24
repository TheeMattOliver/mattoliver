/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"

import useResizeObserver from "../../../hooks/useResizeObserver"
import usePrevious from "../../../hooks/usePrevious"
import { BREAKPOINTS, QUERIES } from "../../../constants"
import { ThemeContext } from "../../ThemeContext"
import UnstyledButton from "../../UnstyledButton"

import AreaChartStockBrushChild from "./AreaChartBrushChild"

function AreaChartStockBrush({ data, children }) {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  // This is a hack. Is there another way to set the defaultSelection?

  const utcInvert = d3
    .scaleUtc()
    .domain([
      new Date(`Sun Apr 22 2007 19:00:00 GMT-0500 (Central Daylight Time`),
      new Date(`Mon Apr 30 2012 19:00:00 GMT-0500 (Central Daylight Time)`),
    ])
    .range([40, 918])

  const [selection, setSelection] = useState([
    utcInvert.invert(742.8784741144415),
    utcInvert.invert(918),
  ])
  console.log("selection: ", selection)

  const previousSelection = usePrevious(selection)

  // to dynamically set the width of the clip path element
  const [rectWidth, setRectWidth] = useState()

  useEffect(() => {
    if (!dimensions) return
    if (!data) return

    const svg = d3
      .select(svgRef.current)
      .attr("transform", `translate(0,${560})`)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom
    const focusHeight = 100

    console.log("[margin.left, width - margin.right]: ", [
      margin.left,
      width - margin.right,
    ])

    setRectWidth(innerWidth)

    const xScale = d3
      .scaleUtc()
      .domain(d3.extent(data, d => d.date))
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
      .call(xAxis, xScale, focusHeight)
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

    const defaultSelection = [
      xScale(d3.utcYear.offset(xScale.domain()[1], -1)),
      xScale.range()[1],
    ]
    // brush
    const brush = d3
      .brushX()
      .extent([
        [margin.left, 0.5],
        [width - margin.right, focusHeight - margin.bottom + 0.5],
      ])
      .on("start brush end", event => {
        // every value in the selection is passed to the xScale function and converted back to index values
        if (event.selection) {
          const indexSelection = event.selection.map(xScale.invert)
          setSelection(indexSelection)
        }
      })

    if (previousSelection === selection) {
      svg
        .select(".brush")
        .call(brush)
        .call(brush.move, selection.map(xScale))
        .call(g =>
          g
            .selectAll("rect.selection")
            .style("stroke", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
        )
    }
    const area = (x, y) =>
      d3
        .area()
        .defined(d => !isNaN(d.close))
        .x(d => xScale(d.date))
        .y0(yScale(0))
        .y1(d => yScale(d.close))

    svg
      .selectAll(".areaChart")
      .data([data])
      .join("path")
      .attr("class", "areaChart")
      .attr("fill", "steelblue")
      .attr(
        "d",
        area(xScale, yScale.copy().range([focusHeight - margin.bottom, 4]))
      )
  }, [data, selection, dimensions, colorMode])

  const svgStyles = {
    overflow: "visible",
  }

  return (
    <>
      <RefWrapper ref={wrapperRef}>
        <SVG style={svgStyles} ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="brush" />
        </SVG>
      </RefWrapper>
      {/* {children(selection, rectWidth)} */}
      <AreaChartStockBrushChild
        data={data}
        selection={selection}
        rectWidth={rectWidth}
      />
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

  @media ${QUERIES.tabletAndUp} {
    flex-direction: column;
    height: 150px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`

export default AreaChartStockBrush
