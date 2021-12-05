import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

// this is a WIP, 12/5
export default function CirclePacking({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  const format = d3.format(",d")
  useEffect(() => {
    if (!data) return
    const svg = d3.select(svgRef.current)
    d3.selectAll("g").remove()

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 10, right: 10, bottom: 10, left: 10 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    const pack = data =>
      d3.pack().size([width, height]).padding(3)(
        d3
          .hierarchy(data)
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value)
      )

    const root = pack(data)
    let focus = root
    let view

    const colorScale = d3
      .scaleLinear()
      .domain([0, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl)

    svg
      .attr(
        "viewBox",
        `-${innerWidth * 0.8} -${innerHeight * 0.75} ${innerWidth * 1.5} ${
          innerHeight * 1.5
        }`
      )
      .style("cursor", "pointer")

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
      .attr("fill", d => (d.children ? colorScale(d.depth) : "white"))
      .attr("pointer-events", d => (!d.children ? "none" : null))
      .on("mouseover", function () {
        d3.select(this).attr("stroke", "#000")
      })
      .on("mouseout", function () {
        d3.select(this).attr("stroke", null)
      })

    const label = svg
      .append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .style("fill-opacity", d => (d.parent === root ? 1 : 0))
      .style("display", d => (d.parent === root ? "inline" : "none"))
      .text(d => d.data.name)
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
  height: 688px;
  svg {
    flex: 1;
  }

  @media ${QUERIES.tabletAndUp} {
    flex-direction: column;
    height: 100%;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
