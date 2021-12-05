import React, { useState, useEffect } from "react"
import { csv, json, sum, descending, format } from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"

import Select from "../../components/Select"
import MapRaceCountyACS2018 from "../../components/D3React/MapRaceCounty/MapRaceCountyACS2018"
import MapComponent from "../../components/D3React/MapRaceCounty/MapComponent"

let total = "B02001_001E"

export default function MapRaceCountyPage() {
  const [variables, setVariables] = useState("")
  const [variable, setVariable] = useState("B02001_002E")

  const [us, setUS] = useState("")
  useEffect(() => {
    json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/counties-albers-10m.json`
    ).then(us => {
      setUS(us)
    })
  }, [])

  const [allData, setAllData] = useState("")
  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/ACSDT5Y2018.B02001_data_with_overlays_2020-05-07T202926.csv`
    ).then(raceData => {
      const variables = new Map(
        Object.entries(raceData[0])
          .filter(([GEO_ID]) => /^B\d+_\d+E$/.test(GEO_ID) && GEO_ID !== total)
          .map(([GEO_ID, id]) => [
            GEO_ID,
            {
              id: GEO_ID,
              name: id.split(/!!/g).pop(),
              total: sum(raceData.slice(1), d => d[GEO_ID]),
            },
          ])
          .sort(([, { total: a }], [, { total: b }]) => descending(a, b))
      )
      setVariables(variables)

      setAllData(raceData)
    })
  }, [])

  return (
    <>
      {!us && <h1>Loading...</h1>}
      {variables && (
        <ButtonWrapper>
          <Select
            value={variable}
            onChange={ev => setVariable(ev.target.value)}
          >
            {Array.from(variables.values(), v => {
              return (
                <option key={v.id} value={v.id}>
                  {v.name} {format(".2~s")(v.total)}
                </option>
              )
            })}
          </Select>
        </ButtonWrapper>
      )}
      <MapComponent
        allData={allData}
        us={us}
        total={total}
        variable={variable}
      />
    </>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  /* justify-content: space-between; */
  padding-right: 1.67rem;
  padding-bottom: 2rem;
  margin-top: 3rem;
`
