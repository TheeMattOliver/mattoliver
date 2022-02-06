import React from "react"
import styled from "styled-components"

import { ThemeProvider } from "./ThemeProvider"

const TestComponent = props => {
  return (
    <Wrapper {...props}>
      <h1>testing</h1>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 2px dashed var("--color-text");
  padding: 16px 32px;
  width: fit-content;
  color: var("--color-text");
`
export default TestComponent
