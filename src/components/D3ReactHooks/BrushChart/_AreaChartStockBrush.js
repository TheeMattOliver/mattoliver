import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import uid from "../DOM/uid"
import useResizeObserver from "../../../hooks/useResizeObserver"
import usePrevious from "../../../hooks/usePrevious"
import { QUERIES } from "../../../constants"
import { sv } from "date-fns/locale"

export default function AreaChartStockBrush({ data, children }) {
  // const [selection, setSelection] = useState([595.5782016348774, 734])
  // const [selection, setSelection] = useState([703.6517711171662, 869])
  const [selection, setSelection] = useState([693.2446866485013, 856])
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  const previousSelection = usePrevious(selection)

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
      // defines where the box can move
      .extent([
        [margin.left, 0.5],
        [width - margin.right, focusHeight - margin.bottom + 0.5],
      ])
      // .on("start brush end", event => {
      //   // clicking outside the brush once will throw an error, if null; so check here
      //   if (event.selection) {
      //     // convert every value back xScale.invert transforms pixel values back to index values
      //     const indexSelection = event.selection
      //       .map(xScale.invert, xScale)
      //       .map(d3.utcDay.round)
      //     setSelection(indexSelection)
      //     console.log("indexSelection: ", indexSelection)
      //   }
      // })
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
    // svg.append("g").call(brush).call(brush.move, defaultSelection)

    let previousIndexSelection = previousSelection
      .map(xScale.invert, xScale)
      .map(d3.utcDay.round)

    console.log("previousIndexSelection: ", previousIndexSelection)

    if (previousIndexSelection === selection) {
      svg.append("g").call(brush).call(brush.move, defaultSelection)
    }

    const gb = svg.append("g").call(brush).call(brush.move, defaultSelection)

    function brushed({ selection }) {
      console.log("brushed is being called now")
      if (selection) {
        svg.property(
          "value",

          selection.map(xScale.invert, xScale).map(d3.utcDay.round)
        )
        svg.dispatch("input")
        // setSelection(selection)
      }
    }

    function brushended({ selection }) {
      if (!selection) {
        gb.call(brush.move, defaultSelection)
      }
    }
  }, [data, dimensions, selection])

  const svgStyles = {
    overflow: "visible",
  }
  return (
    <>
      {children(selection)}
      <RefWrapper ref={wrapperRef}>
        <SVG ref={svgRef} style={svgStyles}>
          <g className="brush" />
        </SVG>
      </RefWrapper>
    </>
  )
}

const RefWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  /* height: 450px; */
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
