import React from 'react';
import styled from 'styled-components/macro';
import {
  SearchIcon,
  MenuIcon,
  XIcon,
} from '@heroicons/react/solid';

const icons = {
  search: SearchIcon,
  menu: MenuIcon,
  close: XIcon,
};

const Icon = ({ id, color, size, strokeWidth, ...delegated }) => {
  const Component = icons[id];

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`);
  }

  return (
    <Wrapper strokeWidth={strokeWidth} {...delegated}>
      <Component color={color} size={size} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  & > svg {
    padding: 0;
    display: block;
    stroke-width: ${(p) =>
    p.strokeWidth !== undefined ? p.strokeWidth + 'px' : undefined};
    width: ${(p) =>
    p.width !== undefined ? p.width + 'px' : undefined};
  }
`;

export default Icon;
