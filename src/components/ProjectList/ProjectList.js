/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby-plugin-intl";
import { format } from 'date-fns';

import { QUERIES, TRANSITIONS } from '../../constants';
import Spacer from '../Spacer';

export default function ProjectList({ projects }) {
  return (
    <>
      <GridWrapper>
        {projects.map(project => {
          return (
            <ProjectCardWrapper key={project.id}>
              <Link to={`/work/${project.slug.current}`}>
                <ProjectCardHeader>
                  <small>
                    <time dateTime="">
                      {format(new Date(project.startedAt), 'MMMM yyyy')}
                    </time>
                  </small>
                  <h2>{project.title}</h2>
                  {` `}
                  <span></span>
                  {` `}
                </ProjectCardHeader>
                <ProjectImageWrapper>
                  <ProjectMainImage
                    image={project.previewImage?.asset.gatsbyImageData}
                    alt={``}
                  />
                </ProjectImageWrapper>
                <ProjectCardContent>
                  <p>
                    {project.excerpt.text[0]._rawChildren[0].text}
                  </p>
                </ProjectCardContent>
                <OffsetProjectCardContentWrapper>
                  <h2>{project.title}</h2>
                  {` `}
                  <span></span>
                  {` `}
                  <small>
                    <time dateTime="">
                      {format(new Date(project.startedAt), 'MMMM yyyy')}
                    </time>
                  </small>
                  <p>
                    {project.excerpt.text[0]._rawChildren[0].text}
                  </p>
                </OffsetProjectCardContentWrapper>
              </Link>
            </ProjectCardWrapper>
          )
        })}
        <Spacer axis='vertical' size={100} />
      </GridWrapper>
      <Spacer axis='vertical' size={200} />
    </>
  )
}

const GridWrapper = styled.div`
  --min-column-width: min(440px, 100%);
  display: grid;
  grid-template-columns:
    repeat(auto-fill, minmax(var(--min-column-width), 1fr));
  grid-gap: 2rem;
  padding: 16px;
  
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
  @media ${QUERIES.desktopAndUp} {
    max-width: none;
    grid-gap: 4rem;
  }
`;

const ProjectCardWrapper = styled.div`
  /* padding: 16px;
  padding: .25rem; 
  justify-content: center;
  align-items: center; 
  border: solid 1px var(--color-borderPrimary);
  height: 280px; */
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-panelBackground);
  border-radius: 3px;
  flex: 1;

  @media ${QUERIES.tabletAndUp} {
    margin: 4rem 3.25rem 4rem 2rem;
  }
  @media ${QUERIES.laptopAndUp} {
    margin: 4rem 3.25rem 4rem 2rem;
  }
  @media ${QUERIES.desktopAndUp} {
    margin: 1rem;
  }
`;

const ProjectCardHeader = styled.div`
  display: block;
  margin: 1rem 0;
  h2 {
    font-size: calc(1rem + 1vw);
    display: inline-block;
    margin-bottom: .5rem;
    color: var(--color-textPrimary);
  }
  small, time {
    color: var(--color-textSecondary);
  }
  @media ${QUERIES.tabletAndUp} {
    display: none;
  }
`;
const ProjectCardContent = styled.div`
  display: block;
  margin-bottom: 2rem;
  margin-top: 1rem;
  p {
    margin-top: .5rem;
    color: var(--color-textSecondary);
  }
  @media ${QUERIES.tabletAndUp} {
    display: none;
  }
`;

const OffsetProjectCardContentWrapper = styled.div`
  display: none;
  line-height: 1.25rem;
  h2 {
    font-size: calc(1rem + 1vw);
    display: inline-block;
    margin-bottom: .5rem;
    color: var(--color-textPrimary);
    text-decoration: none;
    &::before {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #000;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
  }
  small, time {
    color: var(--color-textSecondary);
  }
  p {
    margin-top: .5rem;
    color: var(--color-textSecondary);
  }
  @media ${QUERIES.tabletAndUp} {
    display: block;
    background: var(--color-panelBackground);
    flex: 1;
    h2 {
      font-size: calc(1rem + 1vw);
      display: inline-block;
      margin-bottom: .5rem;
      color: var(--color-textPrimary);
    }
    small, time {
      color: var(--color-textSecondary);
    }
    p {
      margin-top: .5rem;
      color: var(--color-textSecondary);
    }
    padding: 1rem 1.5rem 1.5rem;
    border-radius: 3px;
    border: solid 1px var(--color-borderPrimary);
    position: absolute;
    margin-top: -3rem;
    margin-right: -2.5rem;
    margin-left: 2rem;
  }
`;

const ProjectImageWrapper = styled.div`
  flex: 1;
  display: flex;
  border: solid 1px var(--color-borderPrimary);
  transition: opacity 100ms ${TRANSITIONS.normalOut};
  &:hover {
    filter: grayscale(0.8);
    &::after {
      opacity: 0.5;
    }
  };
  &::after {
    /* background: linear-gradient(var(--color-blue50), var(--color-blue900)); */
    background: linear-gradient(var(--color-gray50), var(--color-gray900));
    content: '';
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 250ms ${TRANSITIONS.normal};
    width: 100%;
  }
`;

const ProjectMainImage = styled(GatsbyImage)`
  height: calc(100% + 1rem);
  object-fit: cover;
  object-position: top left;
  flex: 1;
  &::after {
    background-image: linear-gradient(var(--color-blue50), var(--color-blue500));
    content: '';
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 150ms ${TRANSITIONS.normal};
    width: 100%;
  }
`;

const ProjectTitleLink = styled(props => <Link {...props} />)`
  color: red;
  /* &:hover {
    text-decoration: underline;
  } */
`;


