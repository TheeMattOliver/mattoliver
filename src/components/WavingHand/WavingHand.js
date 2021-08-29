import React from 'react';
import styled from 'styled-components';

const WavingHand = () => {
  return (
    <AnimatedHand
      role="img"
      aria-label="Waving hand"
    >
      👋
    </AnimatedHand>
  )
}

const AnimatedHand = styled.span`
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
`;

export default WavingHand

