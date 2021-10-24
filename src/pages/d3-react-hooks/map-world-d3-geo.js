import React, { useEffect, useState } from "react"
import * as d3 from "d3"

import MapWorldGeo from "../../components/D3ReactHooks/MapWorldGeo"

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
      <MapWorldGeo data={data} property={property} />
      <select
        value={property}
        onChange={event => setProperty(event.target.value)}
      >
        <option value="pop_est">Population</option>
        <option value="name_len">Name length</option>
        <option value="gdp_md_est">GDP</option>
      </select>
    </>
  )
}
