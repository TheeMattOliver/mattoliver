import React, { useEffect, useState } from "react"
import MapRaceCountyACS2018 from "./MapRaceCountyACS2018"

export default function MapComponent({ allData, us, total, variable }) {
  const [data, setData] = useState("")

  useEffect(() => {
    if (!allData) return
    if (!variable) return

    console.log("variable: ", variable)
    let data = new Map(
      allData.slice(1).map(d => [d.GEO_ID.slice(-5), +d[variable] / +d[total]])
    )
    setData(data)
  }, [allData, variable])
  return (
    <>
      <MapRaceCountyACS2018
        allData={allData}
        data={data}
        us={us}
        total={total}
        variable={variable}
      />
    </>
  )
}
