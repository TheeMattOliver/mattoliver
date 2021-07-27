import React from 'react';
import { ThemeContext } from '../ThemeContext';
import styled from 'styled-components';

import {
  MoonIcon,
  SunIcon
} from '@heroicons/react/solid'

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
          colorMode === 'light' && <MoonIcon className="h-10 w-10 pl-2 pr-2 text-ggtx-cream-400 -m-3 inline-block rounded-md hover:bg-gray-50 hover:text-gray-900 text-ggtx-cream-400 transition ease-in-out duration-150" />
        }
        {
          colorMode === 'dark' && <SunIcon className="h-10 w-10 pl-2 pr-2 text-ggtx-cream-400 -m-3 inline-block rounded-md hover:bg-gray-50 hover:text-gray-900 text-ggtx-cream-400 transition ease-in-out duration-150" />
        }
      </Toggle>
    </>

  );
};

export default DarkToggleIcon;

const Toggle = styled.div`
  cursor: pointer;
`