/* eslint-disable no-unused-vars */
import React from "react"
import { ThemeContext } from "../ThemeContext"
import styled from "styled-components"
import UnstyledButton from "../UnstyledButton"

const ColorToggle = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  if (!colorMode) {
    return null
  }

  return (
    <>
      <ColorToggleBox
        onClick={() => {
          setColorMode(colorMode === "light" ? "blue" : "light")
        }}
      >
        {colorMode === "light" && (
          <UnstyledButton
            className="-m-4"
            aria-label="Activate dark mode"
            title="Activate dark mode"
          >
            <ColorBtn></ColorBtn>
          </UnstyledButton>
        )}
        {colorMode === "blue" && (
          <UnstyledButton
            aria-label="Activate light mode"
            title="Activate light mode"
          >
            <ColorBtn></ColorBtn>
          </UnstyledButton>
        )}
      </ColorToggleBox>
    </>
  )
}

export default ColorToggle

const ColorToggleBox = styled.div`
  cursor: pointer;
  svg {
  }
  button {
    transition: transform 250ms;
  }

  button:hover,
  button:focus {
    transform: translateY(0px) scale(1.1);
  }
`

const ColorBtn = styled.div`
  height: 20px;
  background-color: var(--color-blue500);
  width: calc(1em * 1.5 + 0.75rem + 1px * 2);
  padding-right: 0;
  padding-left: 0;
`
