/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"

import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"
import BarNormalizedCensus from "../../components/D3ReactHooks/BarNormalizedCensus"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function BarNormalizedCensusPage() {
  const [censusData, setCensusData] = useState([])
  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/us-population-state-age.csv`
    )
      .then(csvData => {
        csvData.forEach(d => {
          let columns = csvData.columns

          d.total = d3.sum(columns, c => d[c])

          censusData.push(d.total)
          censusData.push(columns)
        })
        setCensusData(
          csvData.sort((a, b) => b["<10"] / b.total - a["<10"] / a.total)
        )
      })
      .catch(error => {
        console.log("error: ", error)
      })
  }, [])
  return <BarNormalizedCensus data={censusData} />
}
