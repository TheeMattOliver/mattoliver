import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../Button"
import { ThemeContext, useTheme } from "../ThemeProvider"
import { spooky, primary, space, tufte } from "../../theme"

const themeMap = {
  spooky: spooky,
  primary: primary,
  space: space,
  tufte: tufte,
}

const ThemeToggle = () => {
  const { theme, setTheme } = React.useContext(ThemeContext)

  if (!theme) {
    return null
  }

  return (
    <Wrapper>
      <Button
        variant="invisible"
        size="small"
        onClick={() => setTheme(themeMap["primary"])}
      >
        Default
      </Button>
      <Button
        variant="invisible"
        size="small"
        onClick={() => setTheme(themeMap["space"])}
      >
        Space
      </Button>
      <Button
        variant="invisible"
        size="small"
        onClick={() => setTheme(themeMap["spooky"])}
      >
        Spooky
      </Button>
      <Button
        variant="invisible"
        size="small"
        onClick={() => setTheme(themeMap["tufte"])}
      >
        Tufte
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
`

export default ThemeToggle
