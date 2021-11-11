import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../hooks/useResizeObserver"
import { QUERIES } from "../../constants"

import uid from "./DOM/uid"

export default function BubbleChartFlare({ data }) {
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

    const colorScale = d3.scaleOrdinal(
      data.map(d => d.group),
      d3.schemeCategory10
    )

    const format = d3.format(",d")

    const pack = data =>
      d3
        .pack()
        .size([width - 2, height - 2])
        .padding(3)(d3.hierarchy({ children: data }).sum(d => d.value))

    const root = pack(data)

    // const svg = d3
    //   .create("svg")
    //   .attr("viewBox", [0, 0, width, height])
    //   .attr("font-size", 10)
    //   .attr("font-family", "sans-serif")
    //   .attr("text-anchor", "middle")

    const leaf = svg
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`)

    leaf
      .append("circle")
      .attr("id", d => (d.leafUid = uid("leaf")).id)
      .attr("r", d => d.r)
      .attr("fill-opacity", 0.7)
      .attr("fill", d => colorScale(d.data.group))

    leaf
      .append("clipPath")
      .attr("id", d => (d.clipUid = uid("clip")).id)
      .append("use")
      .attr("xlink:href", d => d.leafUid.href)

    leaf
      .append("text")
      .attr("clip-path", d => d.clipUid)
      .selectAll("tspan")
      .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
      .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d)
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle")

    leaf.append("title").text(
      d =>
        `${
          d.data.title === undefined
            ? ""
            : `${d.data.title}
`
        }${format(d.value)}`
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
