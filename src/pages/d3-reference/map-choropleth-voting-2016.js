import React, { useState, useEffect } from "react"
import { json, csv } from "d3"
import * as topojson from "topojson-client"
import MapChoropleth2016Election from "../../components/D3React/MapChoropleth2016Election"

export default function MapChoroplethVoting2016() {
  const [data, setData] = useState("")
  useEffect(() => {
    json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/2016-clinton-trump-votes.json`
    ).then(electionData => {
      setData(electionData)
    })
  }, [])

  const [votes, setVotes] = useState("")
  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/tonmcg/County_Level_Election_Results_12-16/master/2016_US_County_Level_Presidential_Results.csv`
    ).then(votesData => {
      const votes = votesData
        .map(row => ({
          id: row.combined_fips.padStart(5, "0"),
          count: {
            total: +row.votes_total,
            dem: +row.votes_dem,
            gop: +row.votes_gop,
          },
          percent: { dem: +row.per_dem, gop: +row.per_gop },
          two_party_ratio: +row.votes_dem / (+row.votes_dem + +row.votes_gop),
        }))
        .map(row => {
          switch (row.id) {
            case "02270": // Wade Hampton Census Area was renamed to Kusilvak Census Area (Alaska)
              return { ...row, id: "02158" }
            case "46113": // Shannon County Census Area was renamed to Oglala Lakota County Census Area (South Dakota)
              return { ...row, id: "46102" }
            default:
              return row
          }
        })

      setVotes(votes)
    })
  })

  const [us, setUS] = useState("")
  useEffect(() => {
    json(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/counties-albers-10m-alt.json`
    ).then(us => {
      setUS(us)
    })
  }, [])

  const [populations, setPopulations] = useState("")
  useEffect(() => {
    csv(
      `https://gist.githubusercontent.com/jake-low/907af4cc717e4c289346c6b262d68a50/raw/4e9f4012d346ecff75aaeee751e7f1af3cd9c1d7/co-est2017-alldata.csv`
    ).then(populationData => {
      let population = populationData
        .filter(row => row.COUNTY !== "000")
        .map(row => ({
          id: row.STATE + row.COUNTY,
          population: +row.POPESTIMATE2016,
        }))

      // Kalawao County (FIPS 15005) was incorporated into Maui County (FIPS 15009)
      const kalawao = population.find(county => county.id === "15005")
      const maui = population.find(county => county.id === "15009")

      maui.population += kalawao.population // add kalawao population to maui county
      population = population.filter(county => county.id !== "15005") // remove kalawao county

      setPopulations(population)
    })
  }, [])

  return (
    <>
      <MapChoropleth2016Election
        data={data}
        us={us}
        votes={votes}
        populations={populations}
      />
    </>
  )
}
