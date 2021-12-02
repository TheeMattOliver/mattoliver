import React, { useState, useEffect } from "react"
import { csv, descending } from "d3"

import BarHorizontalLetterFrequency from "../../components/D3ReactHooks/BarHorizontalLetterFrequency"

export default function BarHorizontalLetterFrequencyPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/alphabet.csv`
    ).then(data => {
      setData(data.sort((a, b) => descending(a.frequency, b.frequency)))
    })
  }, [])

  return (
    <>
      <BarHorizontalLetterFrequency data={data} />
    </>
  )
}
