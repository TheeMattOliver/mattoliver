import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../hooks/useResizeObserver"
import { QUERIES } from "../../constants"

export default function LineChartInlineLabelsFruit({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  console.log({ data })

  useEffect(() => {
    if (!data) return
    const svg = d3.select(svgRef.current)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 30, right: 50, bottom: 30, left: 30 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    d3.selectAll("g").remove()

    const colorScale = d3.scaleOrdinal(
      ["Bananas", "Apples"],
      d3.schemeCategory10
    )

    const labelPadding = 6

    const series = ["Bananas", "Apples"].map(key =>
      data.map(({ [key]: value, date }) => ({ key, date, value }))
    )

    const xScale = d3
      .scaleUtc()
      .domain([data[0].date, data[data.length - 1].date])
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(series, s => d3.max(s, d => d.value))])
      .range([height - margin.bottom, margin.top])

    const xAxis = g =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(xScale)
          .ticks(width / 80)
          .tickSizeOuter(0)
      )

    svg.append("g").call(xAxis)

    const serie = svg.append("g").selectAll("g").data(series).join("g")

    serie
      .append("path")
      .attr("fill", "none")
      .attr("stroke", d => colorScale(d[0].key))
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(d => xScale(d.date))
          .y(d => yScale(d.value))
      )

    serie
      .append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(d => d)
      .join("text")
      .text(d => d.value)
      .attr("dy", "0.35em")
      .attr("x", d => xScale(d.date))
      .attr("y", d => yScale(d.value))
      .call(text =>
        text
          .filter((d, i, data) => i === data.length - 1)
          .append("tspan")
          .attr("font-weight", "bold")
          .text(d => ` ${d.key}`)
      )
      .clone(true)
      .lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", labelPadding)
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
