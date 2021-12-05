import React, { useState } from "react"
import styled from "styled-components"
import BarStackedBasic from "../../components/D3React/BarStackedBasic"

// each year has values that we want to stack on top of each other
// the d3 stack function stacks all of our values together so we can
// create sequences we can use for every section in a stack

// we passed an array of objects for different decades and value for fruits
// we use the stackGenerator function from D3, transformed the data we have into
// layers

// so instead of using objects for each decade, we were creating arrays for each fruit or vegetable,
// we were using a layer for each layer started where the last left off
const data = [
  {
    year: 1980,
    "🍎": 10,
    "🍊": 15,
    "🍌": 20,
    "🥝": 25,
    "🫐": 30,
  },
  {
    year: 1990,
    "🍎": 20,
    "🍊": 30,
    "🍌": 40,
    "🥝": 50,
    "🫐": 60,
  },
  {
    year: 2000,
    "🍎": 30,
    "🍊": 38,
    "🍌": 45,
    "🥝": 65,
    "🫐": 80,
  },
  {
    year: 2010,
    "🍎": 40,
    "🍊": 55,
    "🍌": 60,
    "🥝": 75,
    "🫐": 100,
  },
  {
    year: 2020,
    "🍎": 50,
    "🍊": 65,
    "🍌": 80,
    "🥝": 95,
    "🫐": 120,
  },
]

const allKeys = ["🍎", "🍊", "🍌", "🥝", "🫐"]

const colors = {
  "🍎": "#d53e4f",
  "🍊": "#fc8d59",
  "🍌": "#fee08b",
  "🥝": "#99d594",
  "🫐": "#3288bd",
}

// {
//   red: "#d53e4f"
//   orange: "#fc8d59"
//   yellow: "#fee08b"
//   orange: "#ffffbf"
//   lime: "#e6f598"
//   green: "#99d594"
//   blue: "#3288bd"
// }

export default function BarStackedBasicPage() {
  const [keys, setKeys] = useState(allKeys)
  return (
    <>
      <BarStackedBasic data={data} keys={keys} colors={colors} />

      <FieldsWrapper>
        {allKeys.map(key => (
          <div key={key}>
            <Checkbox
              id={key}
              type="checkbox"
              checked={keys.includes(key)}
              onChange={e => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])))
                } else {
                  setKeys(keys.filter(_key => _key !== key))
                }
              }}
            />
            <label htmlFor={key} style={{ color: colors[key] }}>
              {key}
            </label>
          </div>
        ))}
      </FieldsWrapper>
    </>
  )
}
const Wrapper = styled.div`
  margin: 0 auto;
`
const FieldsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 2rem;
`

const Checkbox = styled.input`
  margin-right: 4px;
`
