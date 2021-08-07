/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby-plugin-intl";

import { QUERIES } from '../../constants';

export default function ProjectList({ projects }) {
  return (
    <>
      <GridWrapper>
        {projects.map(project => {
          return (
            <ProjectCardWrapper key={project.id}>
              <Link to={`/work/${project.slug.current}`}>
                <ProjectImageWrapper>
                  <ProjectMainImage
                    image={project.previewImage?.asset.gatsbyImageData}
                    alt={``}
                  />
                </ProjectImageWrapper>
                <ProjectCardContentWrapper>
                  <h2>{project.title}</h2> -
                  <small>{project.endedAt}</small>
                </ProjectCardContentWrapper>
              </Link>
            </ProjectCardWrapper>
          )
        })}
      </GridWrapper>
    </>
  )
}

const GridWrapper = styled.div`
  --min-column-width: min(320px, 100%);
  display: grid;
  grid-template-columns:
    repeat(auto-fill, minmax(var(--min-column-width), 1fr));
  gap: 16px;
  padding: 16px;
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
  @media ${QUERIES.desktopAndUp} {
    max-width: none;
  }
`;

const ProjectCardWrapper = styled.div`
  /* padding: 16px;
  padding: .25rem; */
  /* justify-content: center;
  align-items: center; */
  margin: 0 1rem; 
  height: 280px; 
  border: solid 1px var(--color-borderPrimary);
  background: var(--color-panelBackground);
  border-radius: 3px;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  @media ${QUERIES.desktopAndUp} {
    margin: 0 1rem 1rem 1rem;
  }
`;

const ProjectCardContentWrapper = styled.div`
  border: solid 1px var(--color-borderPrimary);
  background: var(--color-panelBackground);
  border-radius: 3px;
  position: absolute;
  flex: 1;
  margin-top: -3rem;
  margin-right: -.75rem;
  right: 0;
  padding: 1rem 1.5rem 1.5rem;
  h2 {
    font-size: calc(1rem + 1vw);
    display: inline-block;
    margin-bottom: .5rem;
    color: var(--color-textPrimary);

  }
`;

const ProjectImageWrapper = styled.div`
  flex: 1;
  display: flex;
  border: solid 1px deeppink;
  &:hover {
    opacity: 0.5;
    filter: grayscale(0.8);
  } 
`;

const ProjectMainImage = styled(GatsbyImage)`
  height: calc(100% + 1rem);
  object-fit: cover;
  object-position: top left;
  flex: 1;
  /* max-width: 95%; */
`;


