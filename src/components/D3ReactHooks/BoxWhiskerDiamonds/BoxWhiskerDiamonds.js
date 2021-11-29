import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

export default function BoxWhiskerDiamonds({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  // console.log({ data })

  useEffect(() => {
    if (!data) return
    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    d3.selectAll("g").remove()

    const bins = d3
      .bin()
      .thresholds(width / 40)
      .value(d => d.x)(data)
      .map(bin => {
        bin.sort((a, b) => a.y - b.y)
        const values = bin.map(d => d.y)
        const min = values[0]
        const max = values[values.length - 1]
        const q1 = d3.quantile(values, 0.25)
        const q2 = d3.quantile(values, 0.5)
        const q3 = d3.quantile(values, 0.75)
        const iqr = q3 - q1 // interquartile range
        const r0 = Math.max(min, q1 - iqr * 1.5)
        const r1 = Math.min(max, q3 + iqr * 1.5)
        bin.quartiles = [q1, q2, q3]
        bin.range = [r0, r1]
        bin.outliers = bin.filter(v => v.y < r0 || v.y > r1) // TODO
        return bin
      })

    const xScale = d3
      .scaleLinear()
      .domain([d3.min(bins, d => d.x0), d3.max(bins, d => d.x1)])
      .rangeRound([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(bins, d => d.range[0]), d3.max(bins, d => d.range[1])])
      .nice()
      .range([height - margin.bottom, margin.top])

    const xAxis = g =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(xScale)
          .ticks(width / 40)
          .tickSizeOuter(0)
      )

    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(null, "s"))
        .call(g => g.select(".domain").remove())

    const g = svg.append("g").selectAll("g").data(bins).join("g")

    g.append("path")
      .attr("stroke", "currentColor")
      .attr(
        "d",
        d => `
        M${xScale((d.x0 + d.x1) / 2)},${yScale(d.range[1])}
        V${yScale(d.range[0])}
      `
      )

    g.append("path")
      .attr("fill", "#ddd")
      .attr(
        "d",
        d => `
        M${xScale(d.x0) + 1},${yScale(d.quartiles[2])}
        H${xScale(d.x1)}
        V${yScale(d.quartiles[0])}
        H${xScale(d.x0) + 1}
        Z
      `
      )

    g.append("path")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d => `
        M${xScale(d.x0) + 1},${yScale(d.quartiles[1])}
        H${xScale(d.x1)}
      `
      )

    g.append("g")
      .attr("fill", "currentColor")
      .attr("fill-opacity", 0.2)
      .attr("stroke", "none")
      .attr("transform", d => `translate(${xScale((d.x0 + d.x1) / 2)},0)`)
      .selectAll("circle")
      .data(d => d.outliers)
      .join("circle")
      .attr("r", 2)
      .attr("cx", () => (Math.random() - 0.5) * 4)
      .attr("cy", d => yScale(d.y))

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
    height: 600px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
