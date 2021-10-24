import React, { useRef, useEffect, useState } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import useResizeObserver from "../../hooks/useResizeObserver"
import { QUERIES } from "../../constants"

function MapWorldGeo({ data, property }) {
  console.log("geo data: ", data)
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)
  // save the currently selected country in a useState hook
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)

    // get our min and max values of whatever property is selected in order to generate color scale
    const minProp = d3.min(
      data.features,
      feature => feature.properties[property]
    )
    const maxProp = d3.max(
      data.features,
      feature => feature.properties[property]
    )

    // console.warn("minProp: ", minProp)
    // console.warn("maxProp: ", maxProp)

    // map the range from min and max to a color scale
    const colorScale = d3
      .scaleLinear()
      .domain([minProp, maxProp])
      .range(["#ccc", "red"])

    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect()

    // project geo-coordinates on a 2D plane; .fitSize() fits the data to viewport
    // when React rerenders this entire chart every time the state updates, use the selected feature
    // as the reference for the projection
    const projection = d3
      .geoMercator()
      .fitSize(
        [width, height],
        // if not selectedCountry, fall back to the entire world
        selectedCountry || data
        // .precision() will increase the re-sampling or recalculation precision
      )
      .precision(100)

    // takes geoJson data,
    // transforms that into the d attribute of a path element
    const pathGenerator = d3.geoPath().projection(projection)

    // create a path element for every country in the world
    // select all of the existing elements in my svg with classname 'country'
    svg
      .selectAll(".country")
      // sync with the features array
      .data(data.features)
      // create a new path element for every new piece of data
      .join("path")
      // when a path element is clicked, receive the current feature and set the selected country to this feature
      .on("click", (event, feature) => {
        // to zoom out if click on country again; if selectedCountry is the feature I'm
        // curently clicking on, the I want the selected country to be null, otherwise
        // I want it to be the country I just clicked on
        setSelectedCountry(selectedCountry === feature ? null : feature)
        console.log("selectedCountry: ", selectedCountry)
      })
      // attach the attribute 'class' = 'country' to these elements so they can update later on
      .attr("class", "country")
      // transition everything after this transition call
      .transition()
      // define the shape of each path element using the pathGenerator
      .attr("d", feature => pathGenerator(feature))
      //
      .attr("fill", feature => colorScale(feature.properties[property]))

    // render text for every selected country
    svg
      .selectAll(".label")
      // always one item, so wrap in []
      .data([selectedCountry])
      .join("text")
      .attr("class", "label")
      .text(
        feature =>
          feature &&
          feature.properties.name +
            ": " +
            feature.properties[property].toLocaleString()
      )
      .attr("x", 10)
      .attr("y", 25)
  }, [data, dimensions, property, selectedCountry])

  return (
    <RefWrapper ref={wrapperRef} style={{ marginBottom: "2rem " }}>
      <SVG ref={svgRef}></SVG>
    </RefWrapper>
  )
}

const RefWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;

  margin-bottom: 1rem;

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

export default MapWorldGeo
