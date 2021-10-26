import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import useResizeObserver from "../../hooks/useResizeObserver"

import { QUERIES } from "../../constants"

const format = d3.format(",.0f")

export default function MapBubbleUSPopulation2016({ data, us }) {
  console.log({ data })
  console.log({ us })
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!dimensions) return
    if (!us) return
    // remove paths and groups in case a resize is triggered
    d3.selectAll("g").remove()
    d3.selectAll("d").remove()
    d3.selectAll("path").remove()

    const svg = d3.select(svgRef.current)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const margin = { top: -20, right: 30, bottom: -20, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    const radius = d3.scaleSqrt([0, d3.max(data, d => d.value)], [0, 40])

    const path = d3.geoPath()
    const features = new Map(
      topojson.feature(us, us.objects.counties).features.map(d => [d.id, d])
    )

    svg
      .append("path")
      .datum(topojson.feature(us, us.objects.nation))
      .attr("fill", "#ddd")
      .attr("d", path)

    svg
      .append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path)

    const legend = svg
      .append("g")
      .attr("fill", "#777")
      .attr("transform", "translate(915,608)")
      .attr("text-anchor", "middle")
      .style("font", "10px sans-serif")
      .selectAll("g")
      .data(radius.ticks(4).slice(1))
      .join("g")

    legend
      .append("circle")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("cy", d => -radius(d))
      .attr("r", radius)

    legend
      .append("text")
      .attr("y", d => -2 * radius(d))
      .attr("dy", "1.3em")
      .text(radius.tickFormat(4, "s"))

    svg
      .append("g")
      .attr("fill", "brown")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .selectAll("circle")
      .data(
        data
          .filter(d => d.position)
          .sort((a, b) => d3.descending(a.value, b.value))
      )
      .join("circle")
      .attr("transform", d => `translate(${d.position})`)
      .attr("r", d => radius(d.value))
      .append("title")
      .text(
        d => `${d.title}
${format(d.value)}`
      )
  }, [us, data, dimensions])

  const svgStyles = { overflow: "visible" }

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
    path {
    }
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
