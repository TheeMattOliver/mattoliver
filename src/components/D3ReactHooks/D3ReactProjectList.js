import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"

import { BREAKPOINTS, TRANSITIONS } from "../../constants"

export default function D3ReactProjectList({ data }) {
  const { charts } = data
  console.log({ charts })
  return (
    <ProjectsWrapper>
      <ProjectsCollection>
        <ProjectsGrid>
          {charts.edges.map(chart => {
            return (
              <ProjectCard key={chart.node.id}>
                <Link to={`/d3-react-hooks/${chart.node.slug.current}`}>
                  <CardContentWrapper>
                    <ProjectImageWrapper>
                      <ProjectMainImage
                        image={chart.node.previewImage.asset.gatsbyImageData}
                        alt={""}
                      />
                    </ProjectImageWrapper>
                    <ProjectCardContentInfo>
                      <ProjectCardContent>Testing</ProjectCardContent>
                    </ProjectCardContentInfo>
                  </CardContentWrapper>
                </Link>
              </ProjectCard>
            )
          })}
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
const ProjectCardContentInfo = styled.div`
  width: 100%;
  padding: 1.5rem;
  transition: opacity 0.6s ease;
  opacity: 0;
  bottom: 0;
`

const ProjectCard = styled.div`
  width: var(--project-width);
  border: 1px solid deeppink;
  scroll-snap-align: start;
  margin: 1rem 0;
  --border-radius: 5px;
  border-radius: var(--border-radius);
  &:hover {
    ${ProjectCardContentInfo} {
      opacity: 1;
      color: var(--color-textPrimary);
    }
  }
`
/* to keep the image contained in its parent*/
const CardContentWrapper = styled.div`
  flex: 1;
  position: relative;
`
const ProjectCardContent = styled.div`
  display: block;
  position: absolute;
  /* padding: 0.5rem;
  margin-bottom: 2rem;
  margin-top: 1rem; */
  p {
    margin-top: 0.5rem;
    color: var(--color-textSecondary);
  }
`

/* separate trigger from effect to avoid doom flicker
listen for hovers on parent, apply transformation to child */
const ProjectImageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: solid 1px var(--color-borderPrimary);
  border-radius: 5px;
  transition: opacity 0.6s ease;
`
const ProjectMainImage = styled(GatsbyImage)`
  aspect-ratio: 1 / 1;
  object-fit: cover;
  &:hover {
    filter: grayscale(0.8);
    &::after {
      opacity: 0.5;
    }
  }
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
    transition: opacity 0.6s ease;
    width: 100%;
  }
`
