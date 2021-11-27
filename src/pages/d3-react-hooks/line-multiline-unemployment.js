import React, { useState, useEffect } from "react"
import { tsv, utcParse } from "d3"
import LineMultilineUnemployment from "../../components/D3ReactHooks/LineMultilineUnemployment"

export default function LineMultilineUmemploymentPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    tsv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/unemployment.tsv`
    ).then(tsvData => {
      const columns = tsvData.columns.slice(1)
      setData({
        y: "% Unemployment",
        series: tsvData.map(d => ({
          name: d.name.replace(/, ([\w-]+).*/, " $1"),
          values: columns.map(k => +d[k]),
        })),
        dates: columns.map(utcParse("%Y-%m")),
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
