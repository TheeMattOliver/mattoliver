import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../hooks/useResizeObserver"
import context2d from "./DOM/context2d"
import { QUERIES } from "../../constants"

export default function ForceGraphCollision({ data }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    if (!data) return
    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 45, right: 20, bottom: 35, left: 60 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom
    const colorScale = d3.scaleOrdinal(
      d3.range(4),
      ["transparent"].concat(d3.schemeTableau10)
    )
    const context = context2d(width, height)
    const nodes = data.map(Object.create)

    const simulation = d3
      .forceSimulation(nodes)
      .alphaTarget(0.3) // stay hot
      .velocityDecay(0.1) // low friction
      .force("x", d3.forceX().strength(0.01))
      .force("y", d3.forceY().strength(0.01))
      .force(
        "collide",
        d3
          .forceCollide()
          .radius(d => d.r + 1)
          .iterations(3)
      )
      .force(
        "charge",
        d3.forceManyBody().strength((d, i) => (i ? 0 : (-width * 2) / 3))
      )
      .on("tick", ticked)

    d3.select(context.canvas)
      .on("touchmove", event => event.preventDefault())
      .on("pointermove", pointed)

    // invalidation.then(() => simulation.stop())

    function pointed(event) {
      const [x, y] = d3.pointer(event)
      nodes[0].fx = x - width / 2
      nodes[0].fy = y - height / 2
    }

    function ticked() {
      context.clearRect(0, 0, width, height)
      context.save()
      context.translate(width / 2, height / 2)
      for (const d of nodes) {
        context.beginPath()
        context.moveTo(d.x + d.r, d.y)
        context.arc(d.x, d.y, d.r, 0, 2 * Math.PI)
        context.fillStyle = colorScale(d.group)
        context.fill()
      }
      context.restore()
    }

    return context.canvas
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
