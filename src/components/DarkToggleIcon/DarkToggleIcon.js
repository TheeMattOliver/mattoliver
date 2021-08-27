/* eslint-disable no-unused-vars */
import React from 'react';
import { ThemeContext } from '../ThemeContext';
import styled from 'styled-components';
import UnstyledButton from '../UnstyledButton'
// import {
//   MoonIcon,
//   SunIcon
// } from '@heroicons/react/solid'

const DarkToggleIcon = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext);

  if (!colorMode) {
    return null;
  }

  return (
    <>
      <Toggle
        onClick={() => {
          setColorMode(colorMode === 'light' ? 'dark' : 'light')
        }}
      >
        {
          colorMode === 'light' && (
            <UnstyledButton aria-label="Activate dark mode" title="Activate dark mode">
              <MoonIcon
                className="h-8 w-8 pl-2 pr-2 -m-3 inline-block rounded-md hover:text-blue-500 transition ease-in-out duration-150"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </MoonIcon>
            </UnstyledButton>
          )
        }
        {
          colorMode === 'dark' && (
            <UnstyledButton aria-label="Activate light mode" title="Activate light mode">
              <SunIcon
                className="h-8 w-8 pl-2 pr-2 -m-3 inline-block rounded-md hover:text-blue-300 transition ease-in-out duration-150"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </SunIcon>
            </UnstyledButton>
          )
        }
      </Toggle>
    </>

  );
};

export default DarkToggleIcon;

const Toggle = styled.div`
  cursor: pointer;
  svg {
    margin-top: -0.75rem;
  }
  button {
    transition: transform 250ms;
  }
  
  button:hover, button:focus {
    transform: translateY(0px) scale(1.1);
  }
`;

const SunIcon = styled.svg`
`;

const MoonIcon = styled.svg`
`;
