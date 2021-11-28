import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import { sankey as sankeyGenerator, sankeyLinkHorizontal } from "d3-sankey"
import styled from "styled-components"
import uid from "./DOM/uid"
import useResizeObserver from "../../hooks/useResizeObserver"
import { QUERIES } from "../../constants"

export default function SankeyDiagramEnergy({ data, align, edgeColor }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  // console.log({ data })
  // console.log({ edgeColor })
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

    const _sankey = sankeyGenerator()
      .nodeId(d => d.name)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [1, 1],
        [innerWidth - 1, innerHeight - 5],
      ])
    const sankey = ({ nodes, links }) =>
      _sankey({
        nodes: nodes.map(d => Object.assign({}, d)),
        links: links.map(d => Object.assign({}, d)),
      })

    const f = d3.format(",.0f")
    const format = d => `${f(d)} TWh`

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
    // const color = name => _color(name.replace(/ .*/, ""))
    // const color = d => {
    //   return d => _color(d.category === undefined ? d.name : d.category)
    // }

    const { nodes, links } = sankey(data)

    svg
      .append("g")
      .attr("stroke", "#000")
      .selectAll("rect")
      .data(nodes)
      .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      // .attr("fill", d => color(d.name))
      .attr("fill", d => colorScale(d.name.replace(/ .*/, "")))
      .append("title")
      .text(d => `${d.name}\n${format(d.value)}`)

    const link = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.5)
      .selectAll("g")
      .data(links)
      .join("g")
      .style("mix-blend-mode", "multiply")

    function update() {
      if (edgeColor === "path") {
        const gradient = link
          .append("linearGradient")
          .attr("id", (d, i) => {
            //  (d.uid = DOM.uid("link")).id
            const id = `link-${i}`
            d.uid = `url(#${id})`
            return id
          })
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", d => d.source.x1)
          .attr("x2", d => d.target.x0)

        gradient
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", d => colorScale(d.source.name))

        gradient
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", d => colorScale(d.target.name))
      }

      link
        .append("path")
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke", d =>
          edgeColor === "path"
            ? d.uid
            : edgeColor === "input"
            ? colorScale(d.source.name)
            : colorScale(d.target.name)
        )
        .attr("stroke-width", d => Math.max(1, d.width))
    }

    update()

    link
      .append("title")
      .text(d => `${d.source.name} → ${d.target.name}\n${format(d.value)}`)

    svg
      .append("g")
      .style("font", "10px sans-serif")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", d => (d.x0 < innerWidth / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", d => (d.x0 < innerWidth / 2 ? "start" : "end"))
      .text(d => d.name)
  }, [data, align, edgeColor, dimensions])

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
