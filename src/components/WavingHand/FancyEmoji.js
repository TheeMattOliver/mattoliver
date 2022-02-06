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
      <AnimatedHand role="img" aria-label="waving hand">
        <EmojiContents style={styles}>👋</EmojiContents>
      </AnimatedHand>
    )
  } else if (emoji === "👾") {
    return (
      <AnimatedAlien role="img" aria-label="alien invader">
        <EmojiContents style={styles}>👾</EmojiContents>
      </AnimatedAlien>
    )
  } else if (emoji === "👻") {
    return (
      <AnimatedGhost role="img" aria-label="ghost">
        <EmojiContents style={styles}>👻</EmojiContents>
      </AnimatedGhost>
    )
  } else {
    throw new Error(`Unrecognized emoji: ${emoji}`)
  }
}

const EmojiContents = styled.span`
  font-size: var(--fontSize);
  height: 100%;
  width: 100%;
  display: block;
`

const AnimatedHand = styled.span`
  background: transparent;
  display: inline-block;
  @media screen and (prefers-reduced-motion: no-preference) {
    @keyframes wave {
      from {
        transform: rotate(-10deg);
      }
      to {
        transform: rotate(30deg);
      }
    }

    &:hover ${EmojiContents} {
      cursor: pointer;

      animation: wave 250ms infinite alternate ease-in-out;
      transform-origin: 75% 80%;
    }
  }
`
const AnimatedGhost = styled.span`
  font-size: var(--fontSize);
  display: inline-block;
  @media screen and (prefers-reduced-motion: no-preference) {
    @keyframes zoomOutRight {
      40% {
        opacity: 1;
        transform: scale3d(0.675, 0.675, 0.675) translate3d(-92px, 0, 0);
      }

      to {
        opacity: 0;
        transform: scale(0.04) translate3d(2000px, 0, 0);
      }
    }

    &:hover ${EmojiContents} {
      cursor: pointer;
      animation: zoomOutRight 750ms linear forwards;
      transform-origin: right center;
    }
  }
`
const AnimatedAlien = styled.span`
  font-size: var(--fontSize);
  display: inline-block;
  @media screen and (prefers-reduced-motion: no-preference) {
    @keyframes zoomOutUp {
      40% {
        opacity: 1;
        transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
      }

      to {
        opacity: 0;
        transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);
        animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
      }
    }

    &:hover ${EmojiContents} {
      cursor: pointer;
      animation: zoomOutUp 750ms linear forwards;
      transform-origin: center bottom;
    }
  }
`

export default FancyEmoji
