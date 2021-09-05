import React from 'react';
import styled from 'styled-components';
import { Link } from "gatsby-plugin-intl";

const TechList = ({ technologies }) => {

  // make an array of logo svgs and their id's
  const logosWithIds = technologies.map((item) => ({
    title: item.title,
    url: item.image?.asset?.gatsbyImageData.images.fallback.src,
    id: item.id,
  }));

  return (
    <TechListWrapper>
      <h2>Technologies</h2>
      <ul>
        {
          technologies.map(item => {
            return (
              <TechListItem key={item._key}>
                <Logo src={item.image?.asset?.gatsbyImageData.images.fallback.src} />
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg> */}
                <Link to={`/technology/${item.title}`}>
                  {item.title}
                </Link>

              </TechListItem>
            )
          })
        }
      </ul>
    </TechListWrapper>
  )
}

const TechListWrapper = styled.div`
  margin-bottom: 1rem;
  margin-top: .75rem;
`;

const TechListItem = styled.li`
  display: flex;
  align-items: center;
  padding-left: 16px;
  opacity: 0.7;
  color: var(--color-gray800);
  text-decoration: none;
  transition: opacity 500ms, background-color 200ms ease 0s;

  &:hover,
  &:focus {
    opacity: 1;
    transition: opacity 0ms;
  }
`;

const Logo = styled.img`
  display: block;
  filter: grayscale(1);
  width: 10%;
  margin-right: 10px;
  &:hover,
  &:focus {
    opacity: 1;
    transition: opacity 0ms;
  }
`;


export default TechList