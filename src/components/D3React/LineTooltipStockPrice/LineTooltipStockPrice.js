import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

export default function LineTooltipStockPrice({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  // console.log({ data })

  const formatClose = d3.format("$.2f")
  const formatDate = d3.utcFormat("%b %-d, ’%y")

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
      .domain(d3.extent(data, d => new Date(d.date)))
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.upper)])
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
        .call(d3.axisLeft(yScale).ticks(height / 40))
        .call(g => g.select(".domain").remove())

    const line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.close))

    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-miterlimit", 1)
      .attr("d", line(data))

    svg.append("g").call(xAxis)

    svg.append("g").call(yAxis)

    const dot = svg.append("g").attr("display", "none")

    dot.append("circle").attr("r", 2.5)

    dot
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("y", -8)
      .attr("class", "closing-price")

    dot
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("y", -8)
      .attr("class", "closing-date")

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("opacity", 0)
      .on("mouseover", () => {
        dot.style("display", "block")
      })
      .on("mouseout", () => {
        dot.style("display", "none")
      })
      .on("mousemove", mousemove)

    function mousemove(event) {
      const bisect = d3.bisector(d => d.date).left
      const pointer = d3.pointer(event, this)
      const x0 = bisect(data, xScale.invert(pointer[0]))
      const d0 = data[x0]
      if (!d0) return
      dot.attr("transform", `translate(${xScale(d0.date)},${yScale(d0.close)})`)

      dot
        .selectAll(".closing-date")
        .text(`${formatDate(d0.date)}`)
        .attr("y", -32)
      dot
        .select("text")
        .text(`${formatClose(d0.close)}`)
        .attr("y", -22)
    }
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

  @media ${QUERIES.smAndUp} {
    flex-direction: column;
    height: 688px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
