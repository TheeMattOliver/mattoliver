import React, { useState, useEffect } from "react"
import { json, csv } from "d3"
import MapWorldAirports from "../../components/D3React/MapWorldAirports"

export default function MapAirportsPage() {
  const [world, setWorld] = useState("")
  useEffect(() => {
    json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/land-50m.json`
    ).then(topoJsonData => {
      setWorld(topoJsonData)
    })
  }, [])

  const [data, setData] = useState("")
  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/airports.csv`
    ).then(csvData => {
      setData(csvData)
    })
  }, [])

  return (
    <>
      {!world && <h1>Loading...</h1>}

      <MapWorldAirports data={data} world={world} />
    </>
  )
}
