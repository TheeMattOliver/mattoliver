import React, { useRef, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import useResizeObserver from "../../hooks/useResizeObserver"
import { ThemeContext } from "styled-components"
import { BREAKPOINTS, QUERIES } from "../../constants"

function formatValue(value) {
  return value.toLocaleString("en", {
    style: "currency",
    currency: "USD",
  })
}
function formatDate(date) {
  return date.toLocaleString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  })
}

function LineChartTooltip({ data, property }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    let innerWidth = width - margin.left - margin.right
    let innerHeight = height - margin.top - margin.bottom
  }, [data, dimensions])

  const svgStyles = {
    overflow: "visible",
  }

  return (
    <>
      <RefWrapper ref={wrapperRef}>
        <SVG style={svgStyles} ref={svgRef}>
          <g className="x-axis" />
        </SVG>
      </RefWrapper>
    </>
  )
}

const RefWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  margin-bottom: 2rem;
  svg {
    flex: 1;
    height: 350px;
    &.x-axis {
      stroke: red;
    }
  }
  @media ${QUERIES.tabletAndUp} {
    width: 800px;
    height: 488px;
  }
`

const SVG = styled.svg`
  display: "block";
  width: "100%";
`

export default LineChartTooltip
