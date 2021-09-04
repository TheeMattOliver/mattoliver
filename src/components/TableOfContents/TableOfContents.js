import React from 'react';
import styled from 'styled-components';

const TableOfContents = ({ content }) => {
  return (
    <Wrapper>
      <ol>
        {/* remove the lede */}
        {content.slice(1).map(item => {
          return (
            <li key={item._key}>
              <a
                href={`#${item.anchor}`}
              >
                {item.heading}
              </a>
            </li>
          )
        })}
      </ol>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  margin-bottom: 4rem;
`;

export default TableOfContents
