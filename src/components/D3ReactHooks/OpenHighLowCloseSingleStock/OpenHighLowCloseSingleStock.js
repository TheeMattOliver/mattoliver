import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

export default function OpenHighLowCloseSingleStock({ data }) {
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
    d3.selectAll("path").remove()

    const formatFn = d3.format("+.2%")
    const formatChange = () => {
      return (y0, y1) => formatFn((y1 - y0) / y0)
    }
    const formatValue = d3.format(".2f")
    const formatDate = d3.timeFormat("%B %-d, %Y")

    const yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(
          d3
            .axisLeft(yScale)
            .tickFormat(d3.format("$~f"))
            .tickValues(d3.scaleLinear().domain(yScale.domain()).ticks())
        )
        .call(g =>
          g
            .selectAll(".tick line")
            .clone()
            .attr("stroke-opacity", 0.2)
            .attr("x2", innerWidth - margin.left - margin.right)
        )
        .call(g => g.select(".domain").remove())

    const xAxis = g =>
      g
        .attr("transform", `translate(0,${innerHeight - margin.bottom})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickValues(
              d3.timeMonday
                .every(width > 720 ? 1 : 2)
                .range(data[0].date, data[data.length - 1].date)
            )
            .tickFormat(d3.timeFormat("%-m/%-d"))
        )
        .call(g => g.select(".domain").remove())

    const yScale = d3
      .scaleLog()
      .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
      .rangeRound([innerHeight - margin.bottom, margin.top])

    const xScale = d3
      .scaleBand()
      .domain(
        d3.timeDay
          .range(data[0].date, +data[data.length - 1].date + 1)
          .filter(d => d.getDay() !== 0 && d.getDay() !== 6)
      )
      .range([margin.left, width - margin.right])
      .padding(0.2)

    svg.append("g").call(xAxis)

    svg.append("g").call(yAxis)

    svg
      .append("g")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .selectAll("path")
      .data(data)
      .join("path")
      .attr(
        "d",
        d => `
        M${xScale(d.date)},${yScale(d.low)}V${yScale(d.high)}
        M${xScale(d.date)},${yScale(d.open)}h-4
        M${xScale(d.date)},${yScale(d.close)}h4
      `
      )
      .attr("stroke", d =>
        d.open > d.close
          ? d3.schemeSet1[0]
          : d.close > d.open
          ? d3.schemeSet1[2]
          : d3.schemeSet1[8]
      )
      .append("title")
      .text(
        d => `${formatDate(d.date)}
Open: ${formatValue(d.open)}
Close: ${formatValue(d.close)} (${formatChange(d.open, d.close)})
Low: ${formatValue(d.low)}
High: ${formatValue(d.high)}`
      )
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
