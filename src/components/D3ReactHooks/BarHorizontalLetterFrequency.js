import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import useResizeObserver from "../../hooks/useResizeObserver"

import * as d3 from "d3"
import { QUERIES } from "../../constants"

export default function BarHorizontalLetterFrequency({ data }) {
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

    console.log({ data })

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.frequency)])
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .rangeRound([margin.top, height - margin.bottom])
      .padding(0.1)

    const xAxis = g =>
      g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(xScale).ticks(width / 80, data.format))
        .call(g => g.select(".domain").remove())

    const yAxis = g =>
      g.attr("transform", `translate(${margin.left},0)`).call(
        d3
          .axisLeft(yScale)
          .tickFormat(i => data[i].letter)
          .tickSizeOuter(0)
      )

    const format = xScale.tickFormat(20, "%")

    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", xScale(0))
      .attr("y", (d, i) => yScale(i))
      .attr("width", d => xScale(d.frequency) - xScale(0))
      .attr("height", yScale.bandwidth())

    svg
      .append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", d => xScale(d.frequency))
      .attr("y", (d, i) => yScale(i) + yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(d => format(d.frequency))
      .call(text =>
        text
          .filter(d => xScale(d.frequency) - xScale(0) < 20) // short bars
          .attr("dx", +4)
          .attr("fill", "black")
          .attr("text-anchor", "start")
      )

    svg.append("g").call(xAxis)

    svg.append("g").call(yAxis)
  }, [data, dimensions])
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
