import React, { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"
import { QUERIES } from "../../../constants"

export default function MapChoropleth2016Election({
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

    // remove groups in case a resize is triggered
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
      .scale(1300)
      .translate([innerWidth / 2, innerHeight / 2])
    const path = d3.geoPath().projection(projection)

    // function testing() {
    //   topojson.feature(us, us.objects.counties).features.map(item => {
    //     const { count, percent, two_party_ratio } = votes.find(
    //       v => v.id === item.id
    //     )
    //     const { population } = populations.find(p => p.id === item.id)

    //     const state = us.objects.states.geometries.find(
    //       state => state.id === item.properties.STATEFP
    //     )

    //     console.log("state: ", state)
    //   })

    //   return "Done"
    // }

    // console.log({ votes })
    // console.log("testing() : ", testing())

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

    const colorScale = d3.scaleSequential(d3.interpolateRdBu)
    // render map
    svg
      .append("g")
      .selectAll("path")
      .data(counties)
      .enter()
      .append("path")
      .attr("fill", county =>
        colorScale(county.properties.votes.two_party_ratio)
      )
      .attr("d", path)
      .attr("class", "county")
      .append("title")
      .text(d =>
        [
          d.properties.name,
          `${format.percent(d.properties.votes.percent.dem)} Clinton`,
          `${format.percent(d.properties.votes.percent.gop)} Trump`,
        ].join(" – ")
      )

    svg
      .append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path)

    // render legend
    const x = d3.scaleLinear().domain(colorScale.domain()).rangeRound([0, 260])

    const legend = svg
      .append("g")
      .style("font-size", "0.8rem")
      .style("font-family", "sans-serif")
      .attr("transform", "translate(600,40)")

    const label = legend
      .append("text")
      .attr("y", -8)
      .attr("font-weight", "bold")
      .text("Ratio of Trump votes to Clinton votes")

    const scale = legend.append("g")

    scale
      .selectAll("rect")
      .data(d3.range(0, 1, 0.01))
      .enter()
      .append("rect")
      .attr("height", 10)
      .attr("x", d => x(d))
      .attr("width", (260 / 100) * 1.25)
      .attr("fill", d => colorScale(d))

    scale
      .call(
        d3
          .axisBottom(x)
          .tickSize(15)
          .tickFormat(v =>
            v > 0.5
              ? `${Math.round(v / (1 - v))}:1`
              : `1:${Math.round((1 - v) / v)}`
          )
          .tickValues([0.2, 0.333, 0.5, 0.666, 0.8])
      )
      .select(".domain")
      .remove()
  }, [us, data, populations, votes, dimensions])

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
