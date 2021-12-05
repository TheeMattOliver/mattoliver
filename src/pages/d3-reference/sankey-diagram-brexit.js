import React, { useState, useEffect } from "react"
import { csv } from "d3"
import SankeyDiagramBrexit from "../../components/D3React/SankeyDiagramBrexit"

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
