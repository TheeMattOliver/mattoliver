/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

export default function LineMultilineStocks({ data, property }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  // get current dimensions of the element we give it
  const dimensions = useResizeObserver(wrapperRef)

  // will be called initially and on every data change
  useEffect(() => {
    if (!data) return
    d3.selectAll("g").remove()

    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const margin = { top: 40, right: 50, bottom: 50, left: 65 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    // calculate dates for xScale
    const startDate = data[0][0].date
    const endDate = data[0][data[0].length - 1].date

    // flatten the data into a single array
    const prices = data.flat().map(d => d.value)
    // and find the max value from that array for yScale
    const maxYValue = d3.max([...prices, 8])

    const xScale = d3.scaleTime(
      // domain
      [startDate, endDate],
      // range
      [margin.left, width - margin.right]
    )

    const yScale = d3.scaleLinear(
      [1, maxYValue],
      [height - margin.bottom, margin.top]
    )

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    const xGrid = g =>
      g
        .selectAll("line")
        .data(xScale.ticks())
        .join("line")
        .attr("x1", d => xScale(d))
        .attr("x2", d => xScale(d))
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .style("stroke-width", 0.2)
        .style("stroke", "black")

    const yGrid = g =>
      g
        .attr("class", "grid-lines")
        .selectAll("line")
        .data(yScale.ticks())
        .join("line")
        .attr("x1", margin.left)
        .attr("x2", width - margin.right)
        .attr("y1", d => yScale(d))
        .attr("y2", d => yScale(d))
        .style("stroke-width", 0.2)
        .style("stroke", "black")

    const yTitle = g =>
      g
        .append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("y", 10)
        .html("Stock Price (USD)")

    const line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(Number(d.value)))
      .curve(d3.curveNatural)

    const yLabel = svg.append("g").call(yTitle)

    const xgridlines = svg.append("g").call(xGrid)

    const ygridlines = svg.append("g").call(yGrid)

    svg
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("class", "stock-lines")
      .attr("d", line)
      .style("stroke", (d, i) => colorScale(d[i].name))
      .style("stroke-width", 2)
      .style("fill", "transparent")

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)

    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .selectAll(".domain")
      .remove()

    svg
      .selectAll("text.label")
      .data(data)
      .join("text")
      .attr("class", "label")
      .attr("x", width - margin.right + 5)
      // The BABA stock name sits right on top of another; let's move it up 12 pixels.
      .attr(
        "y",
        d => yScale(d[d.length - 1].value) + (d[0].name === "BABA" ? -12 : 0)
      )
      .attr("dy", "0.35em")
      .style("fill", d => colorScale(d[0].name))
      .style("font-family", "sans-serif")
      .style("font-size", 12)
      .text(d => d[0].name)
  }, [data, dimensions, property])

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
