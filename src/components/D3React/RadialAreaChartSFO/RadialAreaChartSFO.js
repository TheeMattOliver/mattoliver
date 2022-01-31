import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

import uid from "../DOM/uid"

function RadialAreaChartSFO({ data, property }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!data) return
    d3.selectAll("g").remove()
    d3.selectAll("d").remove()

    const svg = d3.select(svgRef.current)
    // const { width, height } =
    //   dimensions || wrapperRef.current.getBoundingClientRect()
    // const margin = { top: 10, right: 10, bottom: 10, left: 10 }
    // let innerWidth = width - margin.left - margin.right
    // let innerHeight = height - margin.top - margin.bottom
    const height = 688
    const width = 688
    const margin = 10
    let innerRadius = width / 5
    let outerRadius = width / 2 - margin

    const g = svg
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

    const xScale = d3
      .scaleUtc()
      .domain([Date.UTC(2000, 0, 1), Date.UTC(2001, 0, 1) - 1])
      .range([0, 2 * Math.PI])

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(data, d => d.minmin), d3.max(data, d => d.maxmax)])
      .range([innerRadius, outerRadius])

    const xAxis = g =>
      g
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .call(g =>
          g
            .selectAll("g")
            .data(xScale.ticks())
            .join("g")
            .each((d, i) => (d.id = uid("month")))
            .call(g =>
              g
                .append("path")
                .attr("stroke", "#000")
                .attr("stroke-opacity", 0.2)
                .attr(
                  "d",
                  d => `
                M${d3.pointRadial(xScale(d), innerRadius)}
                L${d3.pointRadial(xScale(d), outerRadius)}
              `
                )
            )
            .call(g =>
              g
                .append("path")
                .attr("id", d => d.id.id)
                .datum(d => [d, d3.utcMonth.offset(d, 1)])
                .attr("fill", "none")
                .attr(
                  "d",
                  ([a, b]) => `
                M${d3.pointRadial(xScale(a), innerRadius)}
                A${innerRadius},${innerRadius} 0,0,1 ${d3.pointRadial(
                    xScale(b),
                    innerRadius
                  )}
              `
                )
            )
            .call(g =>
              g
                .append("text")
                .append("textPath")
                .attr("startOffset", 6)
                .attr("xlink:href", d => d.id.href)
                .text(d3.utcFormat("%B"))
            )
        )

    const yAxis = g =>
      g
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .call(g =>
          g
            .selectAll("g")
            .data(yScale.ticks().reverse())
            .join("g")
            .attr("fill", "none")
            .call(g =>
              g
                .append("circle")
                .attr("stroke", "#000")
                .attr("stroke-opacity", 0.2)
                .attr("r", yScale)
            )
            .call(g =>
              g
                .append("text")
                .attr("y", d => -yScale(d))
                .attr("dy", "0.35em")
                .attr("stroke", "#fff")
                .attr("stroke-width", 5)
                .text((x, i) => `${x.toFixed(0)}${i ? "" : "°F"}`)
                .clone(true)
                .attr("y", d => yScale(d))
                .selectAll(function () {
                  return [this, this.previousSibling]
                })
                .clone(true)
                .attr("fill", "currentColor")
                .attr("stroke", "none")
            )
        )
    const area = d3
      .areaRadial()
      .curve(d3.curveLinearClosed)
      .angle(d => xScale(d.date))

    const line = d3
      .lineRadial()
      .curve(d3.curveLinearClosed)
      .angle(d => xScale(d.date))

    g.append("path")
      .attr("fill", "lightsteelblue")
      .attr("fill-opacity", 0.2)
      .attr(
        "d",
        area
          .innerRadius(d => yScale(d.minmin))
          .outerRadius(d => yScale(d.maxmax))(data)
      )

    g.append("path")
      .attr("fill", "steelblue")
      .attr("fill-opacity", 0.2)
      .attr(
        "d",
        area.innerRadius(d => yScale(d.min)).outerRadius(d => yScale(d.max))(
          data
        )
      )

    g.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line.radius(d => yScale(d.avg))(data))

    g.append("g").call(xAxis)

    g.append("g").call(yAxis)
  }, [data, dimensions, property])

  return (
    <RefWrapper ref={wrapperRef}>
      {/*render an svg that and access it in the useEffect hook after the dom elements have been rendered*/}
      <SVG ref={svgRef}></SVG>
    </RefWrapper>
  )
}

const RefWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;

  @media ${QUERIES.smAndUp} {
    flex-direction: column;
    height: 688px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
  height: 688px;
`
export default RadialAreaChartSFO
