import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import uid from "../DOM/uid"
import { QUERIES } from "../../../constants"

function padLinear([x0, x1], k) {
  const dx = ((x1 - x0) * k) / 2
  return [x0 - dx, x1 + dx]
}

function padLog(x, k) {
  return padLinear(x.map(Math.log), k).map(Math.exp)
}

function arc(x1, y1, x2, y2) {
  const r = Math.hypot(x1 - x2, y1 - y2) * 2
  return `
    M${x1},${y1}
    A${r},${r} 0,0,1 ${x2},${y2}
  `
}

export default function AreaChartStockPrice({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  // console.log({ data })

  useEffect(() => {
    if (!data) return
    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 24, right: 10, bottom: 34, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    d3.selectAll("g").remove()
    const arrowId = uid("arrow")
    const gradientIds = data.map(() => uid("gradient"))

    const xScale = d3
      .scaleLog()
      .domain(
        padLog(d3.extent(data.flatMap(d => [+d.POP_1980, +d.POP_2015])), 0.1)
      )
      .rangeRound([margin.left, innerWidth - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain(
        padLinear(
          d3.extent(data.flatMap(d => [+d.R90_10_1980, +d.R90_10_2015])),
          0.1
        )
      )
      .rangeRound([innerHeight - margin.bottom, margin.top])

    const startColor = d3.schemeCategory10[1]
    const endColor = d3.schemeCategory10[3]

    svg
      .append("defs")
      .append("marker")
      .attr("id", arrowId.id)
      .attr("markerHeight", 10)
      .attr("markerWidth", 10)
      .attr("refX", 5)
      .attr("refY", 2.5)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", endColor)
      .attr("d", "M0,0v5l7,-2.5Z")

    svg
      .append("defs")
      .selectAll("linearGradient")
      .data(data)
      .join("linearGradient")
      .attr("id", (d, i) => gradientIds[i].id)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", d => xScale(d.POP_1980))
      .attr("x2", d => xScale(d.POP_2015))
      .attr("y1", d => yScale(d.R90_10_1980))
      .attr("y2", d => yScale(d.R90_10_2015))
      .call(g =>
        g
          .append("stop")
          .attr("stop-color", startColor)
          .attr("stop-opacity", 0.5)
      )
      .call(g =>
        g.append("stop").attr("offset", "100%").attr("stop-color", endColor)
      )

    svg
      .append("g")
      .attr("fill", "none")
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("stroke", (d, i) => gradientIds[i])
      .attr("marker-end", arrowId)
      .attr("d", d =>
        arc(
          xScale(d.POP_1980),
          yScale(d.R90_10_1980),
          xScale(d.POP_2015),
          yScale(d.R90_10_2015)
        )
      )

    svg
      .append("g")
      .attr("fill", "currentColor")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", 1.75)
      .attr("cx", d => xScale(d.POP_1980))
      .attr("cy", d => yScale(d.R90_10_1980))

    svg
      .append("g")
      .attr("fill", "currentColor")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 4)
      .selectAll("text")
      .data(data.filter(d => d.highlight))
      .join("text")
      .attr("dy", d => (d.R90_10_1980 > d.R90_10_2015 ? "1.2em" : "-0.5em"))
      .attr("x", d => xScale(d.POP_2015))
      .attr("y", d => yScale(d.R90_10_2015))
      .text(d => d.nyt_display)
      .call(text => text.clone(true))
      .attr("fill", "none")
      .attr("stroke", "white")

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

    const xAxis = g =>
      g
        .attr("transform", `translate(0,${innerHeight - margin.bottom})`)
        .call(d3.axisBottom(xScale).ticks(innerWidth / 80, ".1s"))
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

    svg.append("g").call(grid)

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
