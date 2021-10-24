import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"

import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function BarNormalizedCensusPage() {
  return (
    <ChartPage
      title={`Normalized Bar chart and the Census API`}
      copy={copy}
    ></ChartPage>
  )
}
