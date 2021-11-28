import React, { useState, useEffect } from "react"
import { csv } from "d3"
import styled from "styled-components"
import SankeyDiagramBrexit from "../../components/D3ReactHooks/SankeyDiagramBrexit"
import ChartPage from "../../templates/ChartPage"
import Select from "../../components/Select"

export default function SankeyDiagramBrexitPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/brexit.csv`
    ).then(csvData => {
      setData(csvData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <SankeyDiagramBrexit data={data} />
    </>
  )
}
