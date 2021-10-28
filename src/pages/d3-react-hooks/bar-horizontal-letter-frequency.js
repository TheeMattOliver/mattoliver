import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"

import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"

import BarHorizontalLetterFrequency from "../../components/D3ReactHooks/BarHorizontalLetterFrequency"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function BarHorizontalLetterFrequencyPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/alphabet.csv`
    ).then(data => {
      setData(data.sort((a, b) => d3.descending(a.frequency, b.frequency)))
    })
  }, [])

  return (
    <>
      <BarHorizontalLetterFrequency data={data} />
    </>
  )
}
