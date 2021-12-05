/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import * as d3 from "d3"

import useResizeObserver from "../../../hooks/useResizeObserver"
import usePrevious from "../../../hooks/usePrevious"
import { BREAKPOINTS, QUERIES } from "../../../constants"
import { ThemeContext } from "../../ThemeContext"
import UnstyledButton from "../../UnstyledButton"

import AreaChartStockBrushChild from "./LineChartBrushChild"

function AreaChartStockBrush({ data, children }) {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  const [selection, setSelection] = useState([27.5, 29])
  const previousSelection = usePrevious(selection)
  // to dynamically set the width of the clip path element
  const [rectWidth, setRectWidth] = useState()

  useEffect(() => {
    if (!dimensions) return

    const svg = d3
      .select(svgRef.current)
      .attr("transform", `translate(0,${560})`)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom
    let dotRadius = 2
    const focusHeight = 100

    setRectWidth(innerWidth)

    // scales + line generator
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([innerHeight - margin.bottom, margin.top])

    const lineGenerator = d3
      .line()
      .x((d, index) => xScale(index))
      .y(d => yScale(d))
      .curve(d3.curveCardinal)

    // render the line
    svg
      .selectAll(".myLine")
      .data([data])
      .join("path")
      .attr("class", "myLine")
      .attr("stroke", `${colorMode === "dark" ? "#F2F2F2" : "#000000"}`)
      .attr("fill", "none")
      .attr("d", lineGenerator)

    svg
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
      {/* {children(selection)} */}
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
