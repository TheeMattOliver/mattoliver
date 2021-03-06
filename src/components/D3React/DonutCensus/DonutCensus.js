import React, { useEffect, useState, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { ThemeContext } from "../../ThemeProvider"

import { QUERIES } from "../../../constants"

const DonutCensus = ({ data, selectedValue }) => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  const svgRef = useRef()
  const wrapperRef = useRef()
  // get current dimensions of the element we give it
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom,
      radius = Math.min(innerWidth, innerHeight) / 2

    const colorScale = d3
      .scaleOrdinal()
      .domain(data.map(d => d.index))
      .range(
        d3
          .quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      )

    const pie = d3
      .pie()
      .padAngle(0.005)
      .value(d => d.value)
      .sort(null)

    let arc = d3
      .arc()
      .outerRadius(radius * 0.9)
      .innerRadius(radius * 0.5)

    pie.value(d => d[selectedValue])

    const totalPopulation = d3
      .sum(data.map(d => d[selectedValue]))
      .toLocaleString()

    // Bind D3 data
    const update = svg.append("g").selectAll("text").data(data)

    // Center text
    const centerText = svg.selectAll(".totalPopulation").data([totalPopulation])

    centerText
      .enter()
      .append("text")
      .style("opacity", 0)
      .merge(centerText)
      .attr(
        "transform",
        `translate(${innerWidth / 2}, ${innerHeight / 2 + 20})`
      )
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .attr("dy", "0.35em")
      .attr("class", "totalPopulation")
      .text(d => d)
      .style("color", `${colorMode === "dark" ? "#F2F2F2" : ""}`)

    centerText.exit().remove()

    //SLICES
    const sliceGroupsUpdate = svg
      .selectAll(".slice")
      //important: use a key function when binding data to keep track of which
      // elements to enter, remove or keep. Must be unique for each data point.
      .data(pie(data), d => d.data.index)

    sliceGroupsUpdate.exit().remove()

    const sliceGroupsEnter = sliceGroupsUpdate
      .enter()
      .append("g")
      .attr("class", "slice")
      .attr(
        "transform",
        `translate(${innerWidth / 2}, ${innerHeight / 2 + 20})`
      )

    sliceGroupsEnter.merge(sliceGroupsUpdate)

    sliceGroupsEnter
      .append("path")
      .attr("class", "arc")
      .each(function (d) {
        this._current = d
      })
      .on("mouseover", function (event, d) {
        d3.select(this).style("fill", () => {
          return d3.rgb(d3.select(this).style("fill")).darker(0.7)
        })
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", () => {
          return d3.rgb(d3.select(this).style("fill")).brighter(0.7)
        })
      })
      .merge(sliceGroupsUpdate.select(".arc"))
      .transition()
      .duration(1000)
      .style("opacity", d => (d.value === 0 ? 0 : 1))
      .attr("fill", (d, i) => colorScale(d.data.index))
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate(this._current, d)
        //Prepare the current for the next update
        this._current = interpolate(0)
        return function (t) {
          return arc(interpolate(t))
        }
      })

    const labelsUpdate = sliceGroupsUpdate.select(".label")

    const labelsEnter = sliceGroupsEnter
      .append("text")
      .attr("class", "label")
      .style("opacity", 0)
      .each(function (d) {
        // console.log('d: ', d)
        this._current = d
      })

    labelsEnter
      .merge(labelsUpdate)
      .transition()
      .duration(1000)
      .style("opacity", d => (d.value === 0 ? 0 : 1))
      .attr(
        "transform",
        `translate(${innerWidth / 2}, ${innerHeight / 2 + 20})`
      )
      .attrTween("transform", function (d) {
        const interpolate = d3.interpolate(this._current, d)
        this._current = interpolate(0)
        return function (t) {
          return `translate(${arc.centroid(interpolate(t))})`
        }
      })

    labelsEnter
      .append("tspan")
      .attr("class", "index")
      .merge(labelsUpdate.select(".index"))
      .attr("y", "-0.7em")
      .style("font-weight", "bold")
      .text(d => (d.value ? d.data.index : ""))

    labelsEnter
      .append("tspan")
      .attr("class", "value")
      .merge(labelsUpdate.select(".value"))
      .attr("x", 0)
      .attr("y", "0.7em")
      .style("font-size", "13px")
      .text(d => (d.value ? d.value.toLocaleString() : ""))
  }, [data, selectedValue, dimensions, colorMode])

  return (
    <RefWrapper ref={wrapperRef}>
      <SVG ref={svgRef}></SVG>
    </RefWrapper>
  )
}

const RefWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  /* margin-bottom: 32px; */
  height: 400px;
  margin-top: -20px;
  svg {
    flex: 1;
  }
  @media ${QUERIES.smAndUp} {
    width: 100%;
    height: 588px;
  }
  @media ${QUERIES.smAndSmaller} {
    margin-top: -80px;
  }

  tspan {
    font: 16px sans-serif;
    text-anchor: middle;
  }

  .totalPopulation {
    font-size: 1.5rem;
    text-anchor: middle;
    @media ${QUERIES.smAndUp} {
      font-size: 3rem;
    }
  }

  .arc:hover {
    cursor: pointer;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
export default DonutCensus
