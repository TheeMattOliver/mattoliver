import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

export default function BandChartWeather({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  // console.log({ data })

  useEffect(() => {
    if (!data) return
    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 20, right: 20, bottom: 30, left: 30 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    d3.selectAll("g").remove()

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, innerWidth - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
      .nice(5)
      .range([innerHeight - margin.bottom, margin.top])

    const xAxis = g =>
      g
        .attr("transform", `translate(0, ${innerHeight - margin.bottom})`)
        .call(
          d3
            .axisBottom(xScale)
            .ticks(innerWidth / 80)
            .tickSizeOuter(0)
        )
        .call(g => g.select(".domain").remove())

    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.yScale)
        )

    const area = d3
      .area()
      .curve(d3.curveStep)
      .x(d => xScale(d.date))
      .y0(d => yScale(d.low))
      .y1(d => yScale(d.high))

    svg.append("path").datum(data).attr("fill", "steelblue").attr("d", area)
    svg.append("g").call(xAxis)

    svg.append("g").call(yAxis)
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
