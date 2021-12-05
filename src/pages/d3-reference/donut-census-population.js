import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { csv } from "d3"

import { QUERIES } from "../../constants"
import Select from "../../components/Select"

import DonutCensus from "../../components/D3React/DonutCensus"

export default function DonutCensusPage() {
  const [selectedValue, setSelectedValue] = useState("2019")
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
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
    <>
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
    </>
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
