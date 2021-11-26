/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import styled from "styled-components"

import MapWorldGeo from "../../components/D3ReactHooks/MapWorldGeo"
import ChartPage from "../../templates/ChartPage"
import Select from "../../components/Select"

export default function MapWorldGeoPage() {
  const [property, setProperty] = useState("pop_est")
  const [data, setData] = useState("")
  useEffect(() => {
    d3.json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/GeoChart.world.geo.json`
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
  return (
    <>
      <ChartPage>
        <MapWorldGeo data={data} property={property} />

        <ButtonWrapper>
          <Select
            value={property}
            onChange={event => setProperty(event.target.value)}
          >
            <option value="pop_est">Population</option>
            <option value="name_len">Name length</option>
            <option value="gdp_md_est">GDP</option>
          </Select>
        </ButtonWrapper>
      </ChartPage>
    </>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  /* justify-content: space-between; */
  padding-right: 1.67rem;
  padding-bottom: 2rem;
`
