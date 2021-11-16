import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import uid from "../DOM/uid"
import useResizeObserver from "../../../hooks/useResizeObserver"
import usePrevious from "../../../hooks/usePrevious"
import { QUERIES } from "../../../constants"

export default function AreaChartStockBrush({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  console.log({ data })

  useEffect(() => {
    if (!data) return
    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom
    const focusHeight = 100

    d3.selectAll("g").remove()
    d3.selectAll("path").remove()

    const xScale = d3
      .scaleUtc()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.close)])
      .range([innerHeight - margin.bottom, margin.top])

    const xAxis = (g, x, height) =>
      g.attr("transform", `translate(0,${innerHeight - margin.bottom})`).call(
        d3
          .axisBottom(xScale)
          .ticks(width / 80)
          .tickSizeOuter(0)
      )

    const yAxis = (g, y, title) =>
      g
        .call(d3.axisLeft(yScale))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .selectAll(".title")
            .join("text")
            .attr("class", "title")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Close $")
        )

    const area = (x, y) =>
      d3
        .area()
        // .defined(d => !isNaN(d.close))
        .x(d => xScale(d.date))
        .y0(d => yScale(0))
        .y1(d => yScale(d.close))

    const brush = d3
      .brushX()
      .extent([
        [margin.left, 0.5],
        [innerWidth - margin.right, focusHeight - margin.bottom + 0.5],
      ])
      .on("brush", brushed)
      .on("end", brushended)

    const defaultSelection = [
      xScale(d3.utcYear.offset(xScale.domain()[1], -1)),
      xScale.range()[1],
    ]

    svg.append("g").call(xAxis, xScale, focusHeight)
    svg
      .append("path")
      .datum(data)
      .attr("fill", "steelblue")
      .attr(
        "d",
        area(xScale, yScale.copy().range([focusHeight - margin.bottom, 4]))
      )

    const gb = svg.append("g").call(brush).call(brush.move, defaultSelection)

    function brushed({ selection }) {
      if (selection) {
        svg.property(
          "value",
          selection.map(xScale.invert, xScale).map(d3.utcDay.round)
        )
        svg.dispatch("input")
      }
    }

    function brushended({ selection }) {
      if (!selection) {
        gb.call(brush.move, defaultSelection)
      }
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

  @media ${QUERIES.tabletAndUp} {
    flex-direction: column;
    height: 150px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
