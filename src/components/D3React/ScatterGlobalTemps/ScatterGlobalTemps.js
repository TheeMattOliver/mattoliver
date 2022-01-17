/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useLayoutEffect, useState } from "react"
import styled from "styled-components"

import * as d3 from "d3"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { ThemeContext } from "../../ThemeContext"
import { QUERIES } from "../../../constants"

const parseYear = d3.timeFormat("%Y")

function ScatterPlotGlobalTemps({ data }) {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  const svgRef = useRef()
  const wrapperRef = useRef()
  // get current dimensions of the element we give it
  const dimensions = useResizeObserver(wrapperRef)

  // Define the div for the tooltip
  // const div = d3
  //   .select("body")
  //   .append("div")
  //   .attr("class", "tooltip")
  //   .attr("id", "tooltip")
  //   .style("opacity", 0)

  useEffect(() => {
    if (!data) return

    const svg = d3.select(svgRef.current)

    if (!dimensions) return
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 10, right: 10, bottom: 80, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const xScale = d3
      .scaleUtc()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right])

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, d => d.value))
      .nice()
      .range([innerHeight, margin.top])

    let maxVal = d3.max(data, d => Math.abs(d.value))
    const colorScale = d3
      .scaleSequential(d3.interpolateRdBu)
      .domain([maxVal, -maxVal])

    const xAxis = g => {
      g.attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale).ticks(width / 80))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .selectAll(".x-axis path")
            .attr("stroke-opacity", `${colorMode === "dark" ? 0.5 : ""}`)
            .attr("stroke-dasharray", `${colorMode === "dark" ? "(2, 2)" : ""}`)
            .style("stroke", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
        )
        .call(g =>
          g
            .selectAll(".x-axis line")
            .attr("stroke-opacity", `${colorMode === "dark" ? 0.5 : ""}`)
            .attr("stroke-dasharray", `${colorMode === "dark" ? "(2, 2)" : ""}`)
            .style("stroke", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
        )
        .call(g =>
          g
            .selectAll(".x-axis text")
            .style("color", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
        )
    }

    const yAxis = g => {
      g.attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale).ticks(null, "+"))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .selectAll(".tick line")
            .filter(d => d === 0)
            .clone()
            .attr("x2", innerWidth)
            .attr("stroke", "#ccc")
        )
        .call(g =>
          g
            .append("text")
            // .attr("fill", "#000")
            .attr("x", 5)
            .attr("y", margin.top)
            .attr("dy", "0.32em")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("Anomaly (°C)")
            .style("fill", `${colorMode === "dark" ? "#F2F2F2" : "#000"}`)
        )
        .call(g =>
          g
            .selectAll(".y-axis path")
            .attr("stroke-opacity", `${colorMode === "dark" ? 0.5 : ""}`)
            .attr("stroke-dasharray", `${colorMode === "dark" ? "(2, 2)" : ""}`)
            .style("stroke", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
        )
        .call(g =>
          g
            .selectAll(".y-axis line")
            .attr("stroke-opacity", `${colorMode === "dark" ? 0.5 : ""}`)
            .attr("stroke-dasharray", `${colorMode === "dark" ? "(2, 2)" : ""}`)
            .style("stroke", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
        )
        .call(g =>
          g
            .selectAll(".y-axis text")
            .style("color", `${colorMode === "dark" ? "#F2F2F2" : ""}`)
        )
    }

    // svg
    //   .append("g")
    //   .attr("stroke", "#000")
    //   .attr("stroke-opacity", 0.2)
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle")
    //   .attr("cx", (d) => xScale(d.date))
    //   .attr("cy", (d) => yScale(d.value))
    //   .attr("fill", (d) => colorScale(d.value))
    //   .attr("r", 2.5)
    //   .style("cursor", "pointer");

    svg
      .selectAll("circle")
      .data(data)
      .join(
        // pass in enter, update, and exit callbacks
        // use 'enter' for every new piece of data that needs to be represented in the svg
        enter =>
          enter.append("g").attr("stroke", "#000").attr("stroke-opacity", 0.4),
        update =>
          update
            .join("circle")
            .attr("cx", d => xScale(d.date))
            .attr("cy", d => yScale(d.value))
            .attr("fill", d => colorScale(d.value))
            .attr("r", 2.5)
            .style("cursor", "pointer"),
        // .on("mouseover", (event, d) => {
        //   div
        //     .transition()
        //     .duration(200)
        //     .style("opacity", 0.9)
        //     .attr("data-date", parseYear(d.date))

        //   div
        //     .html(
        //       "<strong>Year:</strong> <span style='color:white'>" +
        //         parseYear(d.date) +
        //         "</span> <br /><strong>Anomaly:</strong> <span style='color:white'>" +
        //         d.value +
        //         "&#8451; </span> "
        //     )
        //     .style("left", event.pageX + 20 + "px")
        //     .style("top", event.pageY - 28 + "px")
        // })
        // .on("mouseout", () => {
        //   div.transition().duration(500).style("opacity", 0)
        // }),
        exit => exit.remove()
      )
      .join("circle")

    svg.select(".x-axis").call(xAxis)

    svg.select(".y-axis").call(yAxis)
  }, [data, dimensions, colorMode])

  return (
    <RefWrapper ref={wrapperRef}>
      {/*render an svg that and access it in the useEffect hook after the dom elements have been rendered*/}
      <SVG ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </SVG>
    </RefWrapper>
  )
}

const RefWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;

  margin-bottom: 16px;

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

export default ScatterPlotGlobalTemps
