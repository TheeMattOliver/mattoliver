import React, { useEffect, useRef } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../../hooks/useResizeObserver"

import { QUERIES } from "../../../constants"

function BarStackedBasic({ data, keys, colors }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  // will be called initially and on every data change
  useEffect(() => {
    const svg = d3.select(svgRef.current)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    const margin = { top: 30, right: 10, bottom: 40, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // configure our stacking by explicitly telling our stack which keys we want to stack on top of each other
    // we receive as a prop called keys
    const stackGenerator = d3.stack().keys(keys).order(d3.stackOrderAscending)

    // console.log("stackGenerator(data): ", stackGenerator(data))
    // returns an array which contains arrays for every key in our stack
    // ranges/sequences for every avocado in our data array, etc

    // use the layers to render the stacks; also called series usually
    const layers = stackGenerator(data)

    // calculate max; two step process
    // find highest value in layer and then compare
    // highest values to one another
    const extent = [
      0,
      d3.max(layers, layer => d3.max(layer, sequence => sequence[1])),
    ]
    // console.log("extent: ", extent) // [0, 250]

    // with scaleBand we are mapping these explicit
    // years to pixel values on our x axis
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.year))
      .rangeRound([margin.left, width - margin.right])
      // .range([0, width])
      .padding(0.25)

    // with scaleLinear we are mapping this continuous range from 0 to 250
    // to a continuous range of pixel values
    const yScale = d3.scaleLinear().domain(extent).rangeRound([innerHeight, 0])
    // .range([height, 0])

    const xAxis = d3.axisBottom(xScale)
    // render the x axis inside the g element
    svg
      .select(".x-axis")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`)

    const yAxis = d3.axisLeft(yScale)

    // render the y axis inside the g element
    svg
      .select(".y-axis")
      .call(yAxis)
      .attr("transform", `translate(${margin.left},0)`)

    // rendering our layers - we want to create 3 layers of data to form our 5 stacks
    // d3, select all of the existing elements with the class name 'layer'
    // in my svg and sync with the data we pass in
    svg
      .selectAll(".layer")
      .data(layers)
      // create a new group element for me for every layer
      .join("g")
      // give them the attribute, 'class' 'layer' so they can update later on
      .attr("class", "layer")
      // color here will influence fill color of each rect in current group
      .attr("fill", layer => {
        // console.log("layer: ", layer)
        return colors[layer.key]
      })
      // now we have to render 5 rectangles in each layer - 5 on each x-axis value for each item we're counting
      // so we continue general update pattern and say, d3, for every group element you just created,
      // select all of the existing rectangles and synchronize them with the data I'm giving you from the layers array
      .selectAll("rect")
      .data(layer => layer)
      // passing the current data we are in to the children of this group
      .join("rect")
      .attr("x", sequence => xScale(sequence.data.year))
      .attr("width", xScale.bandwidth())
      // top edge values of our rectangles are the 2nd values of our sequence
      .attr("y", sequence => yScale(sequence[1]))
      // bottom edge minus the top edge
      .attr("height", sequence => yScale(sequence[0]) - yScale(sequence[1]))
  }, [colors, data, dimensions, keys])

  const svgStyles = { overflow: "visible", marginTop: "2rem" }
  return (
    <>
      <RefWrapper ref={wrapperRef}>
        <SVG ref={svgRef} style={svgStyles}>
          <g className="x-axis" />
          <g className="y-axis" />
        </SVG>
      </RefWrapper>
    </>
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
    .country:hover {
      stroke: black;
      stroke-width: 1px;
      cursor: pointer;
      filter: brightness(0.7);
    }
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

export default BarStackedBasic
