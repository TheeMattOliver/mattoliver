import React, { useState } from "react"
import { csv } from "d3"
import styled from "styled-components"
import AreaStackedBasic from "../../components/D3React/AreaStackedBasic"
import DataToggleButton from "../../components/DataToggleButton"

import { Button } from "../../components/Button"

// each year has values that we want to stack on top of each other
// the d3 stack function stacks all of our values together so we can
// create sequences we can use for every section in a stack

// different decades and fruits; we use arrays for each fruit to create layers for each
// each layer starts where the last layer was left off

const allKeys = ["🍎", "🍊", "🍌", "🥝", "🫐"]

const colors = {
  "🍎": "#d53e4f",
  "🍊": "#fc8d59",
  "🍌": "#fee08b",
  "🥝": "#99d594",
  "🫐": "#3288bd",
}

export default function AreaStackedBasicPage() {
  const [data, setData] = useState([
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
  ])

  function onAddDataClick() {
    setData([
      ...data,
      {
        year: Math.max(...data.map(d => d.year)) + 10,
        "🍎": Math.round(Math.random() * 100),
        "🍊": Math.round(Math.random() * 110),
        "🍌": Math.round(Math.random() * 125),
        "🥝": Math.round(Math.random() * 135),
        "🫐": Math.round(Math.random() * 150),
      },
    ])
  }

  const [keys, setKeys] = useState(allKeys)
  return (
    <>
      <AreaStackedBasic data={data} keys={keys} colors={colors} />

      <Actions>
        <ButtonWrapper>
          <Button
            variant="primary"
            size="medium"
            onClick={() => setData(onAddDataClick)}
          >
            Add data
          </Button>
        </ButtonWrapper>
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
      </Actions>
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
  margin-bottom: 32px;
  label {
    font-size: 2rem;
  }
`
const Actions = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: center;
  padding-left: 2rem;
  padding-right: 2rem;
`
const Checkbox = styled.input`
  margin-right: 4px;
  width: 18px;
  height: 18px;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1.67rem;
  padding-bottom: 2rem;
  margin-right: auto;
`
