import React from "react"
import styled from "styled-components"

const ChevronDown = ({ color, size, strokeWidth, ...delegated }) => {
  return (
    <Wrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & > svg {
    padding: 0;
    display: block;
    stroke-width: ${p =>
      p.strokeWidth !== undefined ? p.strokeWidth + "px" : undefined};
    width: ${p => (p.width !== undefined ? p.width + "px" : undefined)};
  }
`

ChevronDown.displayName = "ChevronDown"
export { ChevronDown }
