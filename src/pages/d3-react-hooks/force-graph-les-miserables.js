import React, { useState, useEffect } from "react"
import { json } from "d3"
import ForceGraphLesMis from "../../components/D3ReactHooks/ForceGraphLesMis"

export default function ForceGraphLesMisPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    json(
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
