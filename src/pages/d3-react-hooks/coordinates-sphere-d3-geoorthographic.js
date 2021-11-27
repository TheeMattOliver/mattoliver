import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { BREAKPOINTS, QUERIES } from "../../constants"
import Globe from "../../components/D3ReactHooks/Globe"

// const Globe = React.lazy(() =>
//   import(/*webpackPrefetch: true */ "../../components/D3ReactHooks/Globe")
// )

export default function LocationGlobePage() {
  return (
    <>
      <GlobeWrapper>
        {/* <React.Suspense fallback={<div>Loading...</div>}> */}
        <Globe />
        {/* </React.Suspense> */}
      </GlobeWrapper>
    </>
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
