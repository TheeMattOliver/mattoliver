import React from "react"
import styled from "styled-components"

const TestComponent = props => {
  return (
    <Wrapper {...props}>
      <h1>testing</h1>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 2px dashed red;
  padding: 16px 32px;
  width: fit-content;
  color: red;
`
export default TestComponent
