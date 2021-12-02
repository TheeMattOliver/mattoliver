import React, { useState, useEffect } from "react"
import { csv } from "d3"
import BoxWhiskerDiamonds from "../../components/D3ReactHooks/BoxWhiskerDiamonds"

export default function BoxWhiskerDiamondsPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
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
