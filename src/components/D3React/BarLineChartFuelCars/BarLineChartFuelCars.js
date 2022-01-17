import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { ThemeContext } from "../../ThemeContext"
import { QUERIES } from "../../../constants"

export default function BarLineChartFuelCars({ data, children }) {
  const parseYear = d3.timeFormat("%Y")

  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!data) return
    d3.selectAll(".chart-line").remove()
    const svg = d3.select(svgRef.current)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: -20, right: 30, bottom: -20, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    // tooltip
    const div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)

    // scales
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.year))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1)

    const y1Scale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.sales)])
      .rangeRound([innerHeight, 0])

    const y2Scale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.efficiency))
      .rangeRound([innerHeight, 0])

    // line
    const line = d3
      .line()
      .x(d => xScale(d.year) + xScale.bandwidth() / 2)
      .y(d => y2Scale(d.efficiency))

    // axes
    const xAxis = g =>
      g.attr("transform", `translate(0,${innerHeight})`).call(
        d3
          .axisBottom(xScale)
          .ticks(...d3.extent(xScale.domain()), width / 40)
          // tickValues not working here:
          // .tickValues(
          //   d3
          //     .ticks(...d3.extent(xScale.domain()), width / 40)
          //     .filter(value => xScale(value) !== undefined)
          // )
          .tickSizeOuter(0)
      )

    const y1Axis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .style("color", "steelblue")
        .call(d3.axisLeft(y1Scale).ticks(null, "s"))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .append("text")
            .attr("x", -margin.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(data.y1Scale)
        )

    const y2Axis = g =>
      g
        .attr("transform", `translate(${width - margin.right},0)`)
        .call(d3.axisRight(y2Scale))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .append("text")
            .attr("x", margin.right)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(data.y2Scale)
        )

    svg.select(".x-axis").call(xAxis)

    svg.select(".y1-axis").call(y1Axis)
    svg.select(".y2-axis").call(y2Axis)

    // bars
    svg
      .select(".plot-area")
      .attr("fill", "steelblue")
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("id", "bar")
      // origin of each rect is at top left corner, so width goes to right and height goes to bottom
      .style("transform", "scale(1, -1)")
      .attr("x", d => xScale(d.year))
      .attr("width", xScale.bandwidth())
      .attr("y", -innerHeight)
      .on("mouseover", (event, d) => {
        div
          .transition()
          .duration(200)
          .style("opacity", 0.9)
          .attr("data-date", parseYear(d.year))

        div
          .html(
            "<strong>Year:</strong> <span style='color:white'>" +
              d.year +
              "</span> <br /><strong>Sales:</strong> <span style='color:white'>" +
              d.sales.toLocaleString() +
              " new cars sold</span> <br /><strong></strong> <span style='color:white'>" +
              d.efficiency +
              " mpg avg fuel efficiency</span>"
          )
          .style("left", event.pageX + 20 + "px")
          .style("top", event.pageY - 28 + "px")
      })
      .on("mouseout", () => {
        div.transition().duration(500).style("opacity", 0)
      })
      .transition()
      .attr("height", d => y1Scale(0) - y1Scale(d.sales))

    // line
    svg
      // .select(".plot-area")
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "chart-line")
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-miterlimit", 1)
      .attr("stroke-width", 2)
      .attr("d", line(data))
    // draw y axes labels after bars
    svg
      .selectAll(".y1-axis-label")
      .data([data], (entry, index) => entry.sales)
      .join(enter =>
        enter.append("text").attr("y", (entry, index) => innerHeight)
      )
      .text(entry => `↑ New cars sold`)
      .attr("class", "y1-axis-label")
      // .style("fill", "#4682b4")
      .style("fill", "#000000")
      .attr("x", 10)
      .transition()
      .attr("y", 10)

    svg
      .selectAll(".y2-axis-label")
      // wrap our entire data array in another array bc we don't want
      // D3 to generate a new path element for every value in the data array -
      // that makes 31 of the axis labels at once
      .data([data], (entry, index) => entry.sales)
      .join(enter =>
        enter.append("text").attr("y", (entry, index) => innerHeight)
      )
      .text(d => `Avg. fuel efficiency (mpg) ↑`)
      .attr("class", "y2-axis-label")
      .attr("x", innerWidth + 40)
      .attr("text-anchor", "end")
      .attr("fill", "orange")
      .transition()
      .attr("y", 10)
  }, [data, dimensions])

  const svgStyles = {
    overflow: "visible",
  }
  return (
    <RefWrapper ref={wrapperRef}>
      <SVG style={svgStyles} ref={svgRef}>
        <g className="plot-area" />

        <g className="x-axis"></g>
        <g className="y1-axis"></g>
        <g className="y2-axis"></g>
      </SVG>
    </RefWrapper>
  )
}

const RefWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  margin-bottom: 16px;
  svg {
    flex: 1;
  }
  @media ${QUERIES.tabletAndUp} {
    height: 628px;
    margin-top: 150px;
    margin-bottom: 50px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
  .y1-axis-label {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
  }

  .y2-axis-label {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 10px;
  }
  .bar:hover {
    cursor: pointer;
    fill: red;
    /* filter: grayscale(100%) sepia(100%); */
    filter: brightness(0.8);
  }
`
