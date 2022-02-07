import React from "react"
import styled from "styled-components"

const SIZES = {
  small: {
    "--width": 24 + "px",
    "--height": 24 + "px",
  },
  medium: {
    "--width": 48 + "px",
    "--height": 48 + "px",
  },
  large: {
    "--width": 72 + "px",
    "--height": 72 + "px",
  },
  xl: {
    "--width": 96 + "px",
    "--height": 96 + "px",
  },
}

const PlaceholderAvatar = ({ size, ...props }) => {
  const styles = SIZES[size]

  return (
    <Wrapper style={styles}>
      <SVG fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </SVG>
    </Wrapper>
  )
}

const SVG = styled.svg`
  width: 100%;
  height: 100%;
  color: var(--color-gray300);
`
const Wrapper = styled.span`
  display: inline-block;
  height: var(--height);
  width: var(--width);
  border-radius: 9999px;
  overflow: hidden;
  background-color: var(--color-gray100);
`
export default PlaceholderAvatar
