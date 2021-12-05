/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { csv, timeParse } from "d3"
import * as topojson from "topojson-client"
import LineMultilineStocks from "../../components/D3React/LineMultilineStocks"

const parseDate = timeParse("%m/%d/%Y")

export default function LineMultilineStocksPage() {
  const [data, setData] = useState("")

  useEffect(() => {
    csv(
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
      <LineMultilineStocks data={data} />
    </>
  )
}
