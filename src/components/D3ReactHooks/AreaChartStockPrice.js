import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../hooks/useResizeObserver"
import { QUERIES } from "../../constants"

export default function AreaChartStockPrice({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  console.log({ data })

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
    // calculate dates for xScale
    const startDate = data[0].date
    const endDate = data[data.length - 1].date

    // flatten the price data into a single array
    const prices = data.flat().map(d => d.close)

    // and find the max value from that array for yScale
    const maxYValue = d3.max([...prices])
    console.log("maxYValue: ", maxYValue)

    const xScale = d3.scaleUtc(
      //domain
      [new Date(startDate), new Date(endDate)],
      // range
      [margin.left, width - margin.right]
    )

    const yScale = d3.scaleLinear(
      // domain
      [0, maxYValue],
      // range
      [innerHeight - margin.bottom, margin.top]
    )

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(width / 80)
      .tickSizeOuter(0)

    const yAxis = d3.axisLeft(yScale).ticks(height / 40)

    // const defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i])
    const area = d3
      .area()
      .x(d => xScale(d.date))
      // need two different y coordinates for each x coordinate
      // the initial y0 values should match the y value of the x axis positioning
      // (given that you want the bottom of the chart to sit on the x axis:
      .y0(d => yScale(0))
      .y1(d => yScale(d.close))
      .curve(d3.curveCardinal)

    svg.append("path").data([data]).attr("fill", "steelblue").attr("d", area)
    // order matters, so if you want axis lines to be obscured by area, move this before the area append
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("x2", innerWidth)
          .attr("stroke-opacity", 0.1)
      )
      .call(g =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Daily close ($)")
      )

    svg
      .append("g")
      .attr("transform", `translate(0,${innerHeight - margin.bottom})`)
      .call(xAxis)
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
