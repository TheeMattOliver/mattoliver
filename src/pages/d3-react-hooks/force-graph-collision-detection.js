import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import ForceGraphCollision from "../../components/D3ReactHooks/ForceGraphCollision"
import ChartPage from "../../templates/ChartPage"

export default function ForceGraphCollisionPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    let n = 4
    const k = 954 / 200
    const r = d3.randomUniform(k, k * 4)
    setData(
      Array.from({ length: 200 }, (_, i) => ({
        r: r(),
        group: i && (i % n) + 1,
      }))
    )
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <ForceGraphCollision data={data} />
    </>
  )
}
