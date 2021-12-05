import React, { useState, useEffect } from "react"
import { json } from "d3"
import CirclePackingZoomable from "../../components/D3React/CirclePackingZoomable"

export default function CirclePackingZoomablePage() {
  const [data, setData] = useState("")

  useEffect(() => {
    json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/flare-2.json`
    ).then(jsonData => {
      setData(jsonData)
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <CirclePackingZoomable data={data} />
    </>
  )
}
