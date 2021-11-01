/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import * as topojson from "topojson-client"
import styled from "styled-components"
import ChartPage from "../../templates/ChartPage"
import LineMultilineStocks from "../../components/D3ReactHooks/LineMultilineStocks"

const copy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat.`

const parseDate = d3.timeParse("%m/%d/%Y")

export default function LineMultilineStocksPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/stock_data_d3.csv`
    ).then(data => {
      const updated = data.map(({ date, variable, value }) => ({
        date: parseDate(date),
        name: variable,
        value: +value,
      }))

      const filteredArray = [
        updated.filter(({ name }) => name === "AMZN"),
        updated.filter(({ name }) => name === "GOOG"),
        updated.filter(({ name }) => name === "FB"),
        updated.filter(({ name }) => name === "BABA"),
        updated.filter(({ name }) => name === "JD"),
      ]
      setData(filteredArray)
    })
  }, [])

  return (
    <>
      {/* <ChartPage title={`2018 Census/ACS Race data by US County`} copy={copy}> */}
      <LineMultilineStocks data={data} />
      {/* </ChartPage> */}
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
