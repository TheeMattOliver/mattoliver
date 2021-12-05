/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import styled from "styled-components"
import DataToggleButton from "../../components/DataToggleButton"
import Select from "../../components/Select"
import SelectCurveLineChart from "../../components/D3React/SelectCurveLineChart"

export default function LineChartCurveSelectPage() {
  const [value, setValue] = React.useState("curveCardinal")
  const [data, setData] = useState(
    Array.from({ length: 30 }).map(() => Math.random() * 100)
  )
  const onAddDataClick = () =>
    setData([...data, Math.round(Math.random() * 100)])

  return (
    <>
      <SelectCurveLineChart data={data} curve={value} />

      <ButtonWrapper>
        <DataToggleButton onClick={() => setData(onAddDataClick)}>
          Add data
        </DataToggleButton>
        <Select
          label="Choose curve"
          value={value}
          onChange={ev => setValue(ev.target.value)}
        >
          <option value="curveCardinal">curveCardinal</option>
          <option value="curveLinear">curveLinear</option>
          <option value="curveBasis">curveBasis</option>
          <option value="curveStep">curveStep</option>
          <option value="curveNatural">curveNatural</option>
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
