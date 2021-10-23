/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import DonutCensus from "../../components/D3ReactHooks/DonutCensus"

export default function TestingDonutPage() {
  const [selectedValue, setSelectedValue] = useState("2019")
  const [data, setData] = useState("")

  // const size = useWindowSize()
  // const { width, height } = size

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

  const setValues = event => {
    setSelectedValue(event.target.value)
  }

  return (
    <div>
      <div>
        <div onChange={setValues}>
          <input type="radio" value="off" name="selectedValue" /> Off
          <input type="radio" value="2009" name="selectedValue" /> 2009
          <input type="radio" value="2016" name="selectedValue" /> 2016
          <input
            type="radio"
            value="2019"
            name="selectedValue"
            defaultChecked
          />{" "}
          2019
        </div>
      </div>
      <div className="box">
        <DonutCensus
          data={data}
          selectedValue={selectedValue}
          // width={width}
          // height={height}
        />
      </div>
    </div>
  )
}
