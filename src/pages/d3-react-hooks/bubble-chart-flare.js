import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import BubbleChartFlare from "../../components/D3ReactHooks/BubbleChartFlare"
import ChartPage from "../../templates/ChartPage"

export default function BubbleChartFlarePage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/flare.csv`
    ).then(csvData => {
      setData(
        csvData
          .filter(({ value }) => value !== "")
          .map(({ id, value }) => ({
            name: id.split(".").pop(),
            title: id.replace(/\./g, "/"),
            group: id.split(".")[1],
            value: +value,
          }))
      )
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <BubbleChartFlare data={data} />
    </>
  )
}
