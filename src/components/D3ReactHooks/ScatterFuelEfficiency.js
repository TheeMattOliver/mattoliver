import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../hooks/useResizeObserver"
import { QUERIES } from "../../constants"

export default function ScatterFuelEfficiency({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  console.log({ data })

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 45, right: 20, bottom: 35, left: 60 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    d3.selectAll("g").remove()

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.x))
      .nice()
      .range([margin.left, innerWidth - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.y))
      .nice()
      .range([innerHeight - margin.bottom, margin.top])

    const xAxis = g =>
      g
        .attr("transform", `translate(0,${innerHeight - margin.bottom})`)
        .call(d3.axisBottom(xScale).ticks(innerWidth / 80))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .append("text")
            .attr("x", innerWidth)
            .attr("y", margin.bottom - 4)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(data.x)
        )

    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(data.y)
        )
    const grid = g =>
      g
        .attr("stroke", "currentColor")
        .attr("stroke-opacity", 0.1)
        .call(g =>
          g
            .append("g")
            .selectAll("line")
            .data(xScale.ticks())
            .join("line")
            .attr("x1", d => 0.5 + xScale(d))
            .attr("x2", d => 0.5 + xScale(d))
            .attr("y1", margin.top)
            .attr("y2", innerHeight - margin.bottom)
        )
        .call(g =>
          g
            .append("g")
            .selectAll("line")
            .data(yScale.ticks())
            .join("line")
            .attr("y1", d => 0.5 + yScale(d))
            .attr("y2", d => 0.5 + yScale(d))
            .attr("x1", margin.left)
            .attr("x2", innerWidth - margin.right)
        )
    svg.append("g").call(xAxis)

    svg.append("g").call(yAxis)

    svg.append("g").call(grid)

    svg
      .append("g")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 3)

    svg
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("dy", "0.35em")
      .attr("x", d => xScale(d.x) + 7)
      .attr("y", d => yScale(d.y))
      .text(d => d.name)
  }, [data, dimensions])

  const svgStyles = {
    overflow: "visible",
  }
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
