import React from "react"
import styled from "styled-components"

const SIZES = {
  small: {
    "--fontSize": 16 / 16 + "rem",
  },
  medium: {
    "--fontSize": 24 / 16 + "rem",
  },
  large: {
    "--fontSize": 36 / 16 + "rem",
  },
  xl: {
    "--fontSize": 72 / 16 + "rem",
  },
}

const WavingHand = ({ size }) => {
  const styles = SIZES[size]
  return (
    <AnimatedHand role="img" aria-label="Waving hand" style={styles}>
      👋
    </AnimatedHand>
  )
}

const AnimatedHand = styled.span`
  font-size: var(--fontSize);
  @keyframes wave {
    from {
      transform: rotate(-10deg);
    }
    to {
      transform: rotate(30deg);
    }
  }
  display: inline-block;
  &:hover {
    cursor: pointer;
    animation: wave 250ms infinite alternate ease-in-out;
    transform-origin: 75% 80%;
  }
`

export default WavingHand
