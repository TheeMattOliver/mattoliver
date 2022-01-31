import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

export default function MapChoroplethUSPopulationDensity({
  data,
  us,
  populations,
  votes,
}) {
  const svgRef = useRef(null)
  const wrapperRef = useRef(null)
  const dimensions = useResizeObserver(wrapperRef)
  const format = {
    density: x => (x > 1000 ? d3.format(".2s")(x) : d3.format(".3r")(x)),
    percent: d3.format(".1%"),
  }
  useEffect(() => {
    if (!dimensions) return
    if (!us) return
    if (!data) return
    if (!populations) return

    // remove paths and groups in case a resize is triggered
    d3.selectAll("g").remove()
    d3.selectAll("d").remove()

    const svg = d3.select(svgRef.current)

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()
    const margin = { top: -20, right: 30, bottom: -20, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom

    // new
    const projection = d3
      .geoAlbersUsa()
      .scale(1100)
      .translate([innerWidth / 2 + 80, innerHeight / 2 - 100])
    const path = d3.geoPath().projection(projection)

    const counties = topojson
      .feature(us, us.objects.counties)
      .features.map(county => {
        const { count, percent, two_party_ratio } = votes.find(
          v => v.id === county.id
        )
        const { population } = populations.find(p => p.id === county.id)

        const state = us.objects.states.geometries.find(
          state => state.id === county.properties.STATEFP
        )

        const name = `${county.properties.NAME} County, ${state.properties.name}`

        return {
          ...county,
          properties: {
            name,
            state: state.properties.name,
            votes: { count, percent, two_party_ratio },
            population,
            density: (population / county.properties.ALAND) * 1e6,
          },
        }
      })

    // console.log(counties.map(county => county.properties.density))
    // render map
    const domain = [
      0.125,
      Math.max(...counties.map(county => county.properties.density)),
    ]

    const colorScale = d3
      .scaleLog()
      .base(2)
      .domain(domain)
      .interpolate(() => d3.interpolateMagma)

    svg
      .append("g")
      .selectAll("path")
      .data(counties)
      .enter()
      .append("path")
      .attr("fill", d => colorScale(d.properties.density))
      .attr("d", path)
      .append("title")
      .text(
        d =>
          `${d.properties.name} - density: ${format.density(
            d.properties.density
          )} persons / km²`
      )

    svg
      .append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path)

    // render legend
    const thresholds = d3.range(-3, 16).map(x => 2 ** x)
    const xScale = d3.scaleLog().base(2).domain(domain).rangeRound([0, 260])

    const legend = svg
      .append("g")
      .style("font-size", "0.8rem")
      .style("font-family", "sans-serif")
      .attr("transform", `translate(${600},${40})`)

    const label = legend
      .append("text")
      .attr("y", -8)
      .attr("font-weight", "bold")
      .text("Population density (persons / km²)")

    const scale = legend.append("g")

    scale
      .selectAll("rect")
      .data(thresholds)
      .enter()
      .append("rect")
      .attr("height", 10)
      .attr("x", d => xScale(d))
      .attr("width", d => xScale(2 * d) - xScale(d))
      .attr("fill", d => colorScale(d))

    scale
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(15)
          .tickFormat(v =>
            v > 9999
              ? d3.format(".2s")(v)
              : v > 999
              ? d3.format(".1s")(v)
              : String(v)
          )
      )
      .select(".domain")
      .remove()
  }, [us, data, populations, dimensions])

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
  }
  .county:hover {
    stroke: black;
    stroke-width: 1px;
    cursor: pointer;
    filter: brightness(0.7);
  }
  @media ${QUERIES.smAndUp} {
    flex-direction: column;
    height: 688px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`
