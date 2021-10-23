import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import { BREAKPOINTS, QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"
import DataToggleButton from "../../components/DataToggleButton"
// import LocationGlobe from "../../components/D3ReactHooks/Globe"

const Globe = React.lazy(() =>
  import(/*webpackPrefetch: true */ "../../components/D3ReactHooks/Globe")
)

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function LocationGlobePage() {
  return (
    <ChartPage title={`Location globe`} copy={copy}>
      <GlobeWrapper>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Globe />
        </React.Suspense>
      </GlobeWrapper>
    </ChartPage>
  )
}
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1.67rem;
  padding-bottom: 2rem;
  margin-top: 3rem;
`
const GlobeWrapper = styled.div`
  width: 400;
  height: 400;
  @media ${BREAKPOINTS.smAndSmaller} {
    width: 250;
    height: 250;
  }
`
