import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import { nest, key, rollup, entries, map } from "d3-collection"

import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"
import Select from "../../components/Select"

import DonutCensus from "../../components/D3ReactHooks/DonutCensus"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function DonutCensusPage() {
  const [selectedValue, setSelectedValue] = useState("2019")
  const [data, setData] = useState("")

  useEffect(() => {
    let dataArr = []

    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/census-data-2019.csv`
    ).then(data => {
      setData(data)
    })
  }, [])

  if (!data) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  const handleChange = event => {
    setSelectedValue(event.target.value)
  }

  let yearsArr = ["Off", "2009", "2016", "2019"].map(value => value)

  return (
    <ChartPage title={`Donut chart and Census data`} copy={copy}>
      {data ? (
        <DonutCensus data={data} selectedValue={selectedValue} />
      ) : (
        <div>
          <h1>Loading...</h1>
        </div>
      )}

      <ButtonWrapper>
        <Select value={selectedValue} onChange={handleChange}>
          {yearsArr.map((option, index) => (
            <option key={index} value={option}>
              {option}{" "}
            </option>
          ))}
        </Select>
      </ButtonWrapper>
    </ChartPage>
  )
}
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  padding-right: 1.67rem;
  padding-bottom: 2rem;
  @media ${QUERIES.smAndSmaller} {
    margin-left: 1.5rem;
  }
`
