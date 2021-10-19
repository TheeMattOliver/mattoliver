import React, { useState, useEffect } from "react"
import styled from "styled-components"
import * as d3 from "d3"
import { QUERIES } from "../../constants"
import ChartPage from "../../templates/ChartPage"
import DataToggleButton from "../../components/DataToggleButton"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

export default function LineChartTooltipPage() {
  const [csvData, setCsvData] = useState("")
  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/aapl.csv`
    ).then(csvData => {
      // csvData.forEach((row) => {
      //   row.totalVotes = +row.totalVotes;
      //   row.VAP = +row.VAP;
      //   row.turnoutPerc = +row.turnoutPerc;
      //   row.nNonVote = +row.nNonVote;
      //   row.percFromMean = +row.percFromMean;
      // })
      csvData.map(({ date, close }) => {
        return { date, value: close }, { y: "$ Close" }
      })
      setCsvData(csvData)
    })
  }, [])
  return <ChartPage title={`Line chart & tooltip`} copy={copy}></ChartPage>
}
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1.67rem;
  padding-bottom: 2rem;
  margin-top: 3rem;
`
