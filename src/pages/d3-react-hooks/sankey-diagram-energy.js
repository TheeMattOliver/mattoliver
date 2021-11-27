import React, { useState, useEffect } from "react"
import { csv } from "d3"
import styled from "styled-components"
import SankeyDiagramEnergy from "../../components/D3ReactHooks/SankeyDiagramEnergy"
import Select from "../../components/Select"

export default function SankeyDiagramEnergyPage() {
  const [data, setData] = useState("")
  const [align, setAlign] = useState("justify")
  const [edgeColor, setEdgeColor] = useState("path")

  let alignArr = [
    { value: "left", name: "Left-aligned" },
    { value: "right", name: "Right-aligned" },
    { value: "center", name: "Centered" },
    { value: "justify", name: "Justified" },
  ].map(value => value)

  let edgeColorArr = [
    { value: "input", name: "Color by input" },
    { value: "output", name: "Color by output" },
    { value: "path", name: "Color by input-output" },
    { value: "none", name: "No color" },
  ].map(value => value)

  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/TheeMattOliver/public-bucket/main/energy.csv`
    ).then(csvData => {
      const links = []

      csvData.forEach(row => {
        links.push({
          source: row.source,
          target: row.target,
          value: +row.value,
        })
      })

      const nodes = Array.from(
        new Set(links.flatMap(l => [l.source, l.target])),
        name => ({ name, category: name.replace(/ .*/, "") })
      )
      // add id's
      nodes.forEach((o, i) => (o.id = i + 1))
      links.forEach((o, i) => (o.id = i + 1))
      // console.log("links: ", links)

      setData({ nodes, links, units: "TWh" })
    })
  }, [])

  return (
    <>
      {!data && <h1>Loading...</h1>}

      <SankeyDiagramEnergy data={data} align={align} edgeColor={edgeColor} />

      <ButtonWrapper>
        <Select value={align} onChange={ev => setAlign(ev.target.value)}>
          {alignArr.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}{" "}
            </option>
          ))}
        </Select>
      </ButtonWrapper>

      <ButtonWrapper>
        <Select
          value={edgeColor}
          onChange={ev => setEdgeColor(ev.target.value)}
        >
          {edgeColorArr.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}{" "}
            </option>
          ))}
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
