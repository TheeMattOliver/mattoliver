/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby-plugin-intl';
import { QUERIES } from '../../constants';

const PageHero = ({ children }) => {
  return (
    <Wrapper className="max-w-7xl mx-auto px-6">
      <HeroMain className="mt-8">
        <HeroTitle>{children}</HeroTitle>
      </HeroMain>
    </Wrapper >
  )
}

export default PageHero

const Wrapper = styled.div`
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
`;
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
  font-family: system-ui;
  font-variation-settings: 'wght' 750;
`;
const HeroMain = styled.main`
`;