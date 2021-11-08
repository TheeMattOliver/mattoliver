import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import SankeyDiagramEnergy from "../../components/D3ReactHooks/SankeyDiagramEnergy"
import ChartPage from "../../templates/ChartPage"
import Select from "../../components/Select"

export default function SankeyDiagramEnergyPage() {
  const [data, setData] = useState("")
  const [align, setAlign] = useState("justify")
  const [edgeColor, setEdgeColor] = useState("path")

  useEffect(() => {
    d3.csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/energy.csv`
    ).then(csvData => {
      const links = [...csvData]
      const nodes = Array.from(
        new Set(links.flatMap(l => [l.source, l.target])),
        name => ({ name, category: name.replace(/ .*/, "") })
      )
      setData({ nodes, links, units: "TWh" })
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <SankeyDiagramEnergy data={data} align={align} edgeColor={edgeColor} />

      <ButtonWrapper>
        <Select value={align} onChange={ev => setAlign(ev.target.value)}>
          <option value="left">Left-aligned</option>
          <option value="right">Right-aligned</option>
          <option value="center">Centered</option>
          <option value="justify" defaultValue>
            Justified
          </option>
        </Select>
      </ButtonWrapper>

      <ButtonWrapper>
        <Select
          value={edgeColor}
          onChange={ev => setEdgeColor(ev.target.value)}
        >
          <option value="input">Color by input</option>
          <option value="output">Color by output</option>
          <option value="path" defaultValue>
            Color by input-output
          </option>
          <option value="none">No color</option>
        </Select>
      </ButtonWrapper>
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
