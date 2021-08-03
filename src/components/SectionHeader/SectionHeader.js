import React from 'react';
import styled from 'styled-components';

const SectionHeader = ({ id, children }) => {
  return (
    <Wrapper>
      <SectionTitle id={id}>
        {children}
      </SectionTitle>
    </Wrapper>
  )
}

const Wrapper = styled.div`
`;

const SectionTitle = styled.h3`
  color: var(--color-textPrimary);
	padding: 0 1.5rem;
	line-height: 1.5rem;
  font-weight: medium;
  font-size: clamp(
    1rem,
    /* 1.3vw + .9rem, */
		2.25vw + .5rem,
    2.5rem
  );
`;

export default SectionHeader