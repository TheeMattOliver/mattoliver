/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby-plugin-intl';

const PageHero = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Content goes here */}
      <HeroMain className="mt-8">
        <HeroTitle>{children}</HeroTitle>
      </HeroMain>
    </div >
  )
}

export default PageHero

const HeroTitle = styled.h1`
  color: var(--color-textPrimary);
  font-weight: bold;
  font-size: clamp(
    2.2rem,
    3.3vw + 1.25rem,
    3.5rem
  );
  width: clamp(500px, 65%, 800px);
  max-width: 100%;
`;
const HeroMain = styled.main`
`;