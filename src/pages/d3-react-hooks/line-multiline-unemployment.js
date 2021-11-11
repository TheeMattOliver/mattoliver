import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import LineMultilineUnemployment from "../../components/D3ReactHooks/LineMultilineUnemployment"
import ChartPage from "../../templates/ChartPage"

export default function LineMultilineUmemploymentPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.tsv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/unemployment.tsv`
    ).then(tsvData => {
      const columns = tsvData.columns.slice(1)
      setData({
        y: "% Unemployment",
        series: tsvData.map(d => ({
          name: d.name.replace(/, ([\w-]+).*/, " $1"),
          values: columns.map(k => +d[k]),
        })),
        dates: columns.map(d3.utcParse("%Y-%m")),
      })
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <LineMultilineUnemployment data={data} />
    </>
  )
}
