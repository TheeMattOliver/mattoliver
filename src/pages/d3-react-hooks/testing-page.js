/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import styled from "styled-components"

import BarLineChart from "../../components/D3ReactHooks/BarLineChart"

export default function TestingPage({ data, pageContext }) {
  const [csvData, setCsvData] = useState("")

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/new-passenger-cars.csv`
    ).then(csvData => {
      setCsvData(csvData)
    })
  }, [])

  return (
    <div style={{ marginTop: "100px" }}>
      <BarLineChart data={csvData} />
    </div>
  )
}
