import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import useResizeObserver from "../../hooks/useResizeObserver"

import * as d3 from "d3"
import { QUERIES } from "../../constants"

const formatValue = x => (isNaN(x) ? "N/A" : x.toLocaleString("en"))

export default function BarStackedVerticalCensusPopulation({ data, series }) {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!data) return
    if (!series) return
    if (!dimensions) return
    d3.selectAll("g").remove()

    const svg = d3.select(svgRef.current)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const margin = { top: 20, right: 30, bottom: 40, left: 45 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.name))
      .range([margin.left, innerWidth - margin.right])
      .padding(0.1)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
      .rangeRound([innerHeight - margin.bottom, margin.top])

    const colorScale = d3
      .scaleOrdinal()
      .domain(series.map(d => d.key))
      .range(d3.schemeSpectral[series.length])
      .unknown("#ccc")

    const xAxis = g =>
      g
        .attr("transform", `translate(0,${innerHeight - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .call(g => g.selectAll(".domain").remove())

    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(null, "s"))
        .call(g => g.selectAll(".domain").remove())
    // render chart
    svg
      .append("g")
      .selectAll("g")
      .data(series)
      .join("g")
      .attr("fill", d => colorScale(d.key))
      .selectAll("rect")
      .data(d => d)
      .join("rect")
      .attr("x", (d, i) => xScale(d.data.name))
      .attr("y", d => yScale(d[1]))
      .attr("height", d => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .append("title")
      .text(
        d => `${d.data.name} ${d.key}
    ${formatValue(d.data[d.key])}`
      )

    svg.append("g").call(xAxis)

    svg.append("g").call(yAxis)

    // render legend

    const tickValues = [
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
    const x = d3
      .scaleOrdinal()
      .domain(colorScale.domain())
      .range([3, 38, 73, 108, 143, 178, 213, 248, 283])

    const legend = svg
      .append("g")
      .style("font-size", "0.8rem")
      .style("font-family", "sans-serif")
      .attr("transform", `translate(${innerWidth - 350},40)`)

    const label = legend
      .append("text")
      .attr("y", -22)
      .attr("font-weight", "bold")
      .text("Age (years)")

    const scale = legend.append("g")

    scale
      .selectAll("rect")
      .data(tickValues)
      .enter()
      .append("rect")
      .attr("height", 10)
      .attr("x", d => x(d))
      .attr("y", -10)
      .attr("width", 340 / 10)
      .attr("fill", d => colorScale(d))

    scale
      .call(
        d3
          .axisBottom(x)
          .tickSize(6)
          .tickValues(tickValues)
          .tickPadding(8)
          .offset(16)
      )
      .select(".domain")
      .remove()
  }, [data, series, dimensions])
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
