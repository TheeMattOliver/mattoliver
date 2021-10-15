import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"

import { BREAKPOINTS, TRANSITIONS } from "../../constants"

export default function D3ReactProjectList({ charts }) {
  return (
    <ProjectsWrapper>
      <ProjectsCollection>
        <ProjectsGrid>
          <ProjectCard>
            <ProjectMainImage
              src="https://cdn.sanity.io/images/9ox83bxr/production/b65e642dd7b88330f5d020fed7d7c1b0901aa081-3363x2060.png?w=2560&h=1568&auto=format"
              alt="testing"
            />
            <ProjectCardContent>Testing</ProjectCardContent>
          </ProjectCard>
          <ProjectCard>
            <ProjectMainImage
              src="https://cdn.sanity.io/images/9ox83bxr/production/b65e642dd7b88330f5d020fed7d7c1b0901aa081-3363x2060.png?w=2560&h=1568&auto=format"
              alt="testing"
            />
            <ProjectCardContent>Testing</ProjectCardContent>
          </ProjectCard>
          <ProjectCard>
            <ProjectMainImage
              src="https://cdn.sanity.io/images/9ox83bxr/production/b65e642dd7b88330f5d020fed7d7c1b0901aa081-3363x2060.png?w=2560&h=1568&auto=format"
              alt="testing"
            />
            <ProjectCardContent>Testing</ProjectCardContent>
          </ProjectCard>
          <ProjectCard>
            <ProjectMainImage
              src="https://cdn.sanity.io/images/9ox83bxr/production/b65e642dd7b88330f5d020fed7d7c1b0901aa081-3363x2060.png?w=2560&h=1568&auto=format"
              alt="testing"
            />
            <ProjectCardContent>Testing</ProjectCardContent>
          </ProjectCard>
          <ProjectCard>
            <ProjectMainImage
              src="https://cdn.sanity.io/images/9ox83bxr/production/b65e642dd7b88330f5d020fed7d7c1b0901aa081-3363x2060.png?w=2560&h=1568&auto=format"
              alt="testing"
            />
            <ProjectCardContent>Testing</ProjectCardContent>
          </ProjectCard>
          <ProjectCard>
            <ProjectMainImage
              src="https://cdn.sanity.io/images/9ox83bxr/production/b65e642dd7b88330f5d020fed7d7c1b0901aa081-3363x2060.png?w=2560&h=1568&auto=format"
              alt="testing"
            />
            <ProjectCardContent>Testing</ProjectCardContent>
          </ProjectCard>
        </ProjectsGrid>
      </ProjectsCollection>
    </ProjectsWrapper>
  )
}

const ProjectsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid blue;
  width: 100%;
  margin: 2rem;
`

const ProjectsCollection = styled.div`
  --content-horizontal-padding: 4.5rem;
  --gutter: 3rem;
  --project-width: 20rem;
  /* max-width 2400px */
  @media ${BREAKPOINTS.ultraSuperWideAndSmaller} {
    --columns: 6;
    --project-width: calc(
      (
          100vw - var(--content-horizontal-padding) - var(--columns) *
            var(--gutter)
        ) / (var(--columns) + 0.5)
    );
  }
  /* max-width 2100 */
  @media (max-width: 2100px) {
    --columns: 5;
  }
  /* max-width 1800 */
  @media ${BREAKPOINTS.ultraWideAndSmaller} {
    --columns: 4;
  }
  /* max-width 1500 */
  @media ${BREAKPOINTS.desktopAndSmaller} {
    --columns: 3;
  }
  /* max-width 1200 */
  @media (max-width: 1200px) {
    --columns: 2;
  }
  @media (max-width: 768px) and (min-height: 600px) {
    --columns: 1;
    --project-width: 80vw;
  }
  /* @media ${BREAKPOINTS.phoneLgAndSmaller} {
    --project-width: calc(100vw - var(--content-horizontal-padding) * 2);
  } */
`

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(var(--columns), var(--project-width));
  gap: 1rem calc(var(--gutter) / 2);
`

const ProjectCard = styled.div`
  height: 300px;
  width: var(--project-width);
  border: 1px solid deeppink;
  scroll-snap-align: start;
  margin: 1rem 0;
  --border-radius: 5px;
  border-radius: var(--border-radius);
`
const ProjectCardContent = styled.div`
  display: block;
  padding: 0.5rem;
  margin-bottom: 2rem;
  margin-top: 1rem;
  p {
    margin-top: 0.5rem;
    color: var(--color-textSecondary);
  }
`

const ProjectCardImgWrapper = styled.div`
  flex: 1;
  display: flex;
  border: solid 1px var(--color-borderPrimary);
  border-radius: 5px;
  transition: opacity 100ms ${TRANSITIONS.normalOut};
  &:hover {
    filter: grayscale(0.8);
    &::after {
      opacity: 0.5;
    }
  }
  &::after {
    /* background: linear-gradient(var(--color-blue50), var(--color-blue900)); */
    background: linear-gradient(var(--color-gray50), var(--color-gray900));
    content: "";
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 250ms ${TRANSITIONS.normal};
    width: 100%;
  }
`
const ProjectMainImage = styled(GatsbyImage)`
  height: calc(100% + 1rem);
  object-fit: cover;
  object-position: top left;
  flex: 1;
  &::after {
    background-image: linear-gradient(
      var(--color-blue50),
      var(--color-blue500)
    );
    content: "";
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    top: 0;
    transition: opacity 150ms ${TRANSITIONS.normal};
    width: 100%;
  }
`
