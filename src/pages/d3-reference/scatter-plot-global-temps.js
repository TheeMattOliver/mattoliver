/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { csv } from "d3"

import ScatterPlotGlobalTemps from "../../components/D3ReactHooks/ScatterGlobalTemps"

export default function ScatterPlotGlobalTempsPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    return Promise.all([
      csv(
        `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/GLB.Ts+dSST.csv`
      ),
      csv(
        `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/temperatures.csv`
      ),
    ]).then(([nasa, temperatures]) => {
      let data = []
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
  return <ScatterPlotGlobalTemps data={data}></ScatterPlotGlobalTemps>
}
