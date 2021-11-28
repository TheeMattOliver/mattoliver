import React, { useState, useEffect } from "react"
import { json, csv } from "d3"
import MapWorldAirports from "../../components/D3ReactHooks/MapWorldAirports"
import ChartPage from "../../templates/ChartPage"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

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
