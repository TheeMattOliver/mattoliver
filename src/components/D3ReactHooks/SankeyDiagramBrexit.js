import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import { sankey as sankeyGenerator, sankeyLinkHorizontal } from "d3-sankey"
import styled from "styled-components"
import uid from "./DOM/uid"
import useResizeObserver from "../../hooks/useResizeObserver"
import { QUERIES } from "../../constants"

export default function SankeyDiagramBrexit({ data }) {
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

    const _sankey = sankeyGenerator()
      .nodeSort(null)
      .linkSort(null)
      .nodeWidth(4)
      .nodePadding(20)
      .extent([
        [0, 5],
        [width, height - 5],
      ])

    const colorScale = d3
      .scaleOrdinal(["Remain", "Leave"], ["#da4f81", "#5ac5c4"])
      .unknown("#ccc")

    const keys = data.columns.slice(0, -1)

    console.log({ keys })

    const graph = () => {
      let index = -1
      const nodes = []
      const nodeByKey = new Map()
      const indexByKey = new Map()
      const links = []

      for (const k of keys) {
        for (const d of data) {
          const key = JSON.stringify([k, d[k]])
          if (nodeByKey.has(key)) continue
          const node = { name: d[k] }
          nodes.push(node)
          nodeByKey.set(key, node)
          indexByKey.set(key, ++index)
        }
      }

      for (let i = 1; i < keys.length; ++i) {
        const a = keys[i - 1]
        const b = keys[i]
        const prefix = keys.slice(0, i + 1)
        const linkByKey = new Map()
        for (const d of data) {
          const names = prefix.map(k => d[k])
          const key = JSON.stringify(names)
          const value = d.value || 1
          let link = linkByKey.get(key)
          if (link) {
            link.value += value
            continue
          }
          link = {
            source: indexByKey.get(JSON.stringify([a, d[a]])),
            target: indexByKey.get(JSON.stringify([b, d[b]])),
            names,
            value,
          }
          links.push(link)
          linkByKey.set(key, link)
        }
      }

      return { nodes, links }
    }

    const graphObject = graph()
    console.log({ graphObject })
    // const sankey = ({ nodes, links }) =>
    //   _sankey({
    //     nodes: graphObject.nodes.map(d => Object.assign({}, d)),
    //     links: graphObject.links.map(d => Object.assign({}, d)),
    //   })

    // const { nodes, links } = sankey(data)
    const { nodes, links } = _sankey({
      nodes: graphObject.nodes.map(d => Object.assign({}, d)),
      links: graphObject.links.map(d => Object.assign({}, d)),
    })

    svg
      .append("g")
      .selectAll("rect")
      .data(nodes)
      .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .append("title")
      .text(d => `${d.name}\n${d.value.toLocaleString()}`)

    svg
      .append("g")
      .attr("fill", "none")
      .selectAll("g")
      .data(links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", d => colorScale(d.names[0]))
      .attr("stroke-width", d => d.width)
      .style("mix-blend-mode", "multiply")
      .append("title")
      .text(d => `${d.names.join(" → ")}\n${d.value.toLocaleString()}`)

    svg
      .append("g")
      .style("font", "10px sans-serif")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .attr("x", d => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", d => (d.x0 < width / 2 ? "start" : "end"))
      .text(d => d.name)
      .append("tspan")
      .attr("fill-opacity", 0.7)
      .text(d => ` ${d.value.toLocaleString()}`)
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
