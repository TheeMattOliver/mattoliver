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

const FancyEmoji = ({ size = "xl", emoji = "👋" }) => {
  const styles = SIZES[size]

  let Component
  if (emoji === "👋") {
    return (
      <AnimatedHand role="img" aria-label="waving hand" style={styles}>
        👋
      </AnimatedHand>
    )
  } else if (emoji === "👾") {
    return (
      <AnimatedAlien role="img" aria-label="alien invader" style={styles}>
        👾
      </AnimatedAlien>
    )
  } else if (emoji === "👻") {
    return (
      <AnimatedGhost role="img" aria-label="ghost" style={styles}>
        👻
      </AnimatedGhost>
    )
  } else {
    throw new Error(`Unrecognized emoji: ${emoji}`)
  }
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
const AnimatedGhost = styled.span`
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
const AnimatedAlien = styled.span`
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

export default FancyEmoji
