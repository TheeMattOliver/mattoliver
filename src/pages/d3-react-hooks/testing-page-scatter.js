/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import styled from "styled-components"

import ScatterPlot from "../../components/D3ReactHooks/ScatterGlobalTemps"

export default function FullScatterPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    return Promise.all([
      d3.csv(
        `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/GLB.Ts+dSST.csv`
      ),
      d3.csv(
        `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/temperatures.csv`
      ),
    ]).then(([nasa, temperatures]) => {
      let data = []
      console.log("loadAndProcessData, nasa: ", nasa)
      console.log("loadAndProcessData, temperatures: ", temperatures)

      temperatures.forEach(d => {
        for (let i = 1; i < 13; ++i) {
          let columns = temperatures.columns

          data.push({
            date: new Date(Date.UTC(d.Year, i - 1, 1)),
            value: +d[columns[i]],
          })
        }
      })
      setData(data)
    })
  }, [])

  return (
    <div>
      <ScatterPlot data={data} />
    </div>
  )
}
