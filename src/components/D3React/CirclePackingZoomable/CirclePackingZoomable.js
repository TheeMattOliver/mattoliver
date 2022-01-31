import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

export default function CirclePackingZoomable({ data }) {
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
      .style("background", colorScale(0))
      .style("cursor", "pointer")
      .on("click", event => zoom(event, root))

    function zoomTo(v) {
      const k = width / v[2]

      view = v

      label.attr(
        "transform",
        d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      )
      node.attr(
        "transform",
        d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
      )
      node.attr("r", d => d.r * k)
    }

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
      .on(
        "click",
        (event, d) => focus !== d && (zoom(event, d), event.stopPropagation())
      )

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

    zoomTo([root.x, root.y, root.r * 2])

    function zoom(event, d) {
      const focus0 = focus

      focus = d

      const transition = svg
        .transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2])
          return t => zoomTo(i(t))
        })

      label
        .filter(function (d) {
          return d.parent === focus || this.style.display === "inline"
        })
        .transition(transition)
        .style("fill-opacity", d => (d.parent === focus ? 1 : 0))
        .on("start", function (d) {
          if (d.parent === focus) this.style.display = "inline"
        })
        .on("end", function (d) {
          if (d.parent !== focus) this.style.display = "none"
        })
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
  height: 688px;
  background-color: rgb(163, 245, 207);
  svg {
    flex: 1;
  }

  @media ${QUERIES.smAndUp} {
    flex-direction: column;
    height: 100%;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
