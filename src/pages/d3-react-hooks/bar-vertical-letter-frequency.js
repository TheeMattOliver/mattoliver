import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"

import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"

import BarVerticalLetterFrequency from "../../components/D3ReactHooks/BarVerticalLetterFrequency"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function BarVerticalLetterFrequencyPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.csv(
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
