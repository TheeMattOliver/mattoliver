import React, { useState, useEffect } from "react"
import { csv } from "d3"

import { QUERIES } from "../../constants"

import BarVerticalLetterFrequency from "../../components/D3React/BarVerticalLetterFrequency"

export default function BarVerticalLetterFrequencyPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/alphabet.csv`
    ).then(data => {
      data.forEach(({ letter, frequency }) => ({
        name: letter,
        value: +frequency,
      }))
      setData(data)
    })
  }, [])

  return (
    <>
      <BarVerticalLetterFrequency data={data} />
    </>
  )
}
