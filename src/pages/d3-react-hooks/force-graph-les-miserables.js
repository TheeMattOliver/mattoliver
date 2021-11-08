import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import ForceGraphLesMis from "../../components/D3ReactHooks/ForceGraphLesMis"
import ChartPage from "../../templates/ChartPage"

export default function ScatterPlotEfficiencyPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/miserables.json`
    ).then(jsonData => {
      setData(jsonData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <ForceGraphLesMis data={data} />
    </>
  )
}
