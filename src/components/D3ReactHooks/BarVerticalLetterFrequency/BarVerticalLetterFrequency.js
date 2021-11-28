import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"

import * as d3 from "d3"
import { QUERIES } from "../../../constants"

export default function BarVerticalLetterFrequency({ data, order }) {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!data) return
    if (!dimensions) return
    d3.selectAll("g").remove()

    const svg = d3.select(svgRef.current)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const margin = { top: 20, right: 30, bottom: 40, left: 45 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    // Construct scales, axes, and formats.
    const xScale = d3
      .scaleBand()
      .domain(
        d3.groupSort(
          data,
          ([d]) => -d.frequency,
          d => d.letter
        )
      )
      .range([margin.left, innerWidth - margin.right])
      .padding(0.1)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.frequency)])
      .range([innerHeight, 0])

    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0)
    const yAxis = d3.axisLeft(yScale).ticks(innerHeight / 40, "%")

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", innerWidth - margin.left - margin.right)
          .attr("stroke-opacity", 0.1)
      )
      .call(g =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", -10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Frequency")
      )
    const bar = svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => xScale(d.letter))
      .attr("y", d => yScale(d.frequency))
      .attr("height", d => yScale(0) - yScale(d.frequency))
      .attr("width", xScale.bandwidth())

    svg.append("g").attr("transform", `translate(0,${innerHeight})`).call(xAxis)
  }, [data, order, dimensions])
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
  margin-top: 40px;
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
