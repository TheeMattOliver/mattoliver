/* eslint-disable no-unused-vars */
import React from 'react';
import { ThemeContext } from '../ThemeContext';
import styled from 'styled-components';
import UnstyledButton from '../UnstyledButton'

const ColorToggle = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  if (!colorMode) {
    return null;
  }

  return (
    <>
      <ColorToggleBox
        onClick={() => {
          setColorMode(colorMode === 'light' ? 'blue' : 'light')
        }}
      >
        {
          colorMode === 'light' && (
            <UnstyledButton className="-m-4" aria-label="Activate dark mode" title="Activate dark mode">
              <ColorBtn></ColorBtn>
            </UnstyledButton>
          )
        }
        {
          colorMode === 'blue' && (
            <UnstyledButton aria-label="Activate light mode" title="Activate light mode">
              <ColorBtn></ColorBtn>
            </UnstyledButton>
          )
        }
      </ColorToggleBox>
    </>

  );
};

export default ColorToggle;

const ColorToggleBox = styled.div`
  cursor: pointer;
  svg {
    /* margin-top: -0.75rem; */
  }
  button {
    transition: transform 250ms;
  }
  
  button:hover, button:focus {
    transform: translateY(0px) scale(1.1);
  }
`;

const ColorBtn = styled.div`
  height: 40px;
  background-color: var(--color-textPrimary);
  width: calc(1em * 1.5 + .75rem + 1px * 2);
  padding-right: 0;
  padding-left: 0;
  border-radius: 50%;
`;

