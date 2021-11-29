import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

export default function LineMultilineUmemployment({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  // console.log({ data })

  useEffect(() => {
    if (!data) return
    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 45, right: 20, bottom: 35, left: 60 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    d3.selectAll("g").remove()

    const xScale = d3
      .scaleUtc()
      .domain(d3.extent(data.dates))
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.series, d => d3.max(d.values))])
      .nice()
      .range([height - margin.bottom, margin.top])

    const xAxis = g =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(xScale)
          .ticks(width / 80)
          .tickSizeOuter(0)
      )

    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y)
        )

    const line = d3
      .line()
      .defined(d => !isNaN(d))
      .x((d, i) => xScale(data.dates[i]))
      .y(d => yScale(d))

    function hover(svg, path) {
      if ("ontouchstart" in document)
        svg
          .style("-webkit-tap-highlight-color", "transparent")
          .on("touchmove", moved)
          .on("touchstart", entered)
          .on("touchend", left)
      else
        svg
          .on("mousemove", moved)
          .on("mouseenter", entered)
          .on("mouseleave", left)

      const dot = svg.append("g").attr("display", "none")

      dot.append("circle").attr("r", 2.5)

      dot
        .append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .attr("y", -8)

      function moved(event) {
        event.preventDefault()
        const pointer = d3.pointer(event, this)
        const xm = xScale.invert(pointer[0])
        const ym = yScale.invert(pointer[1])
        const i = d3.bisectCenter(data.dates, xm)
        const s = d3.least(data.series, d => Math.abs(d.values[i] - ym))
        path
          .attr("stroke", d => (d === s ? null : "#ddd"))
          .filter(d => d === s)
          .raise()
        dot.attr(
          "transform",
          `translate(${xScale(data.dates[i])},${yScale(s.values[i])})`
        )
        dot.select("text").text(s.name)
      }

      function entered() {
        path.style("mix-blend-mode", null).attr("stroke", "#ddd")
        dot.attr("display", null)
      }

      function left() {
        path.style("mix-blend-mode", "multiply").attr("stroke", null)
        dot.attr("display", "none")
      }
    }
    svg.append("g").call(xAxis)

    svg.append("g").call(yAxis)

    const path = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .selectAll("path")
      .data(data.series)
      .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("d", d => line(d.values))

    svg.call(hover, path)
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
