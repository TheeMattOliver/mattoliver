import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import BoxWhiskerDiamonds from "../../components/D3ReactHooks/BoxWhiskerDiamonds"
import ChartPage from "../../templates/ChartPage"

export default function BoxWhiskerDiamondsPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/diamonds.csv`
    ).then(csvData => {
      let processedData = []
      csvData.forEach(row => {
        processedData.push({
          x: +row.carat,
          y: +row.price,
        })
      })

      setData(processedData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <BoxWhiskerDiamonds data={data} />
    </>
  )
}
