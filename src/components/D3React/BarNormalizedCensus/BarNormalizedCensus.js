import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"

import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

const formatPercent = d3.format(".1%")

const formatValue = x => (isNaN(x) ? "N/A" : x.toLocaleString("en"))

const getSeries = datum => {
  let columnsArr = [
    "<10",
    "10-19",
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60-69",
    "70-79",
    "≥80",
  ]
  // console.log('columnsArr.slice(1, columnsArr.length - 1): ', columnsArr.slice(1, columnsArr.length - 1))
  return d3
    .stack()
    .keys(columnsArr)
    .offset(d3.stackOffsetExpand)(datum)
    .map(d => (d.forEach(v => (v.key = d.key)), d))
}

export default function BarNormalizedCensus({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  // get current dimensions of the element we give it
  const dimensions = useResizeObserver(wrapperRef)
  const series = getSeries(data)
  useEffect(() => {
    const svg = d3.select(svgRef.current)
    // use resized dimensions
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const margin = { top: 75, right: 25, bottom: 25, left: 35 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // tooltip
    // const div = d3
    //   .select("body")
    //   .append("div")
    //   .attr("class", "tooltip")
    //   .attr("id", "tooltip")
    //   .style("opacity", 0)

    // scales and axes
    const xScale = d3.scaleLinear().range([margin.left, width - margin.right])

    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.top, innerHeight])
      .padding(0.08)

    const colorScale = d3
      .scaleOrdinal()
      .domain(series.map(d => d.key))
      .range(d3.schemeSpectral[series.length])
      .unknown("#ccc")

    const xAxis = g =>
      g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(xScale).ticks(width / 100, "%"))
        .call(g => g.selectAll(".domain").remove())

    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).tickSizeOuter(0))
        .call(g => g.selectAll(".domain").remove())

    const legendXScale = d3
      .scaleBand()
      .domain(colorScale.domain())
      .rangeRound([margin.left, 400])

    svg.select(".x-axis").call(xAxis)
    svg.select(".y-axis").call(yAxis)

    // legend
    svg
      .select(".legend")
      .selectAll(".legend")
      .data(colorScale.domain())
      .join("rect")
      .attr("x", legendXScale)
      .attr("y", margin.top - 52)
      .attr("width", Math.max(0, legendXScale.bandwidth() - 1))
      .attr("height", 10)
      .attr("fill", colorScale)
    // legend labels
    svg
      .selectAll(".legend-label")
      .data([
        "<10",
        "10-19",
        "20-29",
        "30-39",
        "40-49",
        "50-59",
        "60-69",
        "70-79",
        "≥80",
      ])
      .enter()
      .append("text")
      .attr("x", legendXScale)
      .attr("y", margin.top - 34)
      .attr("transform", `translate(5,0)`)
      .style("fill", "#000")
      .style("font-size", "9px")
      .text(function (d) {
        return d
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")
    // legend title
    svg
      .selectAll(".legend-title")
      .data([data.key])
      .join(enter => enter.append("text"))
      .text(entry => `Age (years)`)
      .attr("class", "legend-title")
      .attr("fill", "currentColor")
      .attr("x", 45)
      .attr("y", margin.top - 60)

    // chart
    svg
      .append("g")
      .selectAll("g")
      .data(series)
      .enter()
      .append("g")
      .attr("fill", d => colorScale(d.key))
      .selectAll("rect")
      .data(d => d)
      .join("rect")
      .attr("x", d => xScale(d[0]))
      .attr("y", (d, i) => yScale(d.data.name))
      .attr("width", d => xScale(d[1]) - xScale(d[0]))
      .attr("height", yScale.bandwidth())
      .style("cursor", "pointer")
    // .on("mouseover", function (event, d) {
    //   d3.select(this).style("fill", () => {
    //     return d3.rgb(d3.select(this).style("fill")).darker(0.7)
    //   })
    //   div.transition().duration(200).style("opacity", 0.9)
    //   div
    //     .html(
    //       "<strong>State:</strong> <span style='color:white'>" +
    //         d.data.name +
    //         "</span> <br /><strong>Age Band:</strong> <span style='color:white'>" +
    //         d.key +
    //         " </span> <br /><strong>Percentage: </strong> <span style='color:white'>" +
    //         formatPercent(d[1] - d[0]) +
    //         " </span> <br /><strong>Census count:</strong> <span style='color:white'>" +
    //         formatValue(d.data[d.key]) +
    //         " </span>"
    //     )
    //     .style("left", event.pageX + 20 + "px")
    //     .style("top", event.pageY - 28 + "px")
    // })
    // .on("mouseout", function () {
    //   d3.select(this).style("fill", () => {
    //     return d3.rgb(d3.select(this).style("fill")).brighter(0.7)
    //   })
    //   div.transition().duration(500).style("opacity", 0)
    // })
  }, [data, dimensions])
  return (
    <>
      <RefWrapper ref={wrapperRef}>
        <SVG ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
          <g className="legend" />
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
  margin-bottom: 32px;
  svg {
    flex: 1;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: black;
    shape-rendering: crispEdges;
  }

  .axis text {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 11px;
    text-rendering: geometricPrecision;
  }
  .legend-title {
    font-size: 11px;
    font-weight: bold;
    text-anchor: start;
  }
  @media ${QUERIES.smAndUp} {
    width: 100%;
    height: 688px;
  }
  @media ${QUERIES.lgAndUp} {
    height: 1300px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
