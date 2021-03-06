import React from "react"
import styled from "styled-components"

import { QUERIES, FONT_WEIGHTS } from "../../constants"

const ProjectGrid = ({ data }) => {
  console.log("map: ", map)
  return (
    <ProjectsWrapper>
      <ProjectsGrid>
        {data.map(item => {
          return (
            <ProjectCard key={item.id}>
              <a href={`/${item.href}`}>
                <CardContentWrapper>
                  <ProjectImageWrapper>
                    <ProjectMainImage src={item.imgUrl} alt={""} />
                  </ProjectImageWrapper>
                  <ProjectCardContentInfo>
                    <ProjectCardContent>
                      <p>
                        {item.title} {` `} <span>&rarr;</span>
                      </p>
                    </ProjectCardContent>
                  </ProjectCardContentInfo>
                </CardContentWrapper>
              </a>
            </ProjectCard>
          )
        })}
      </ProjectsGrid>
    </ProjectsWrapper>
  )
}

const ProjectsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid blue; */
  /* width: 100%; */
  margin: 0 24px;
`

const ProjectsGrid = styled.div`
  /* --project-width: 30vw; */
  --columns: 3;
  --gutter: 3rem;
  --content-horizontal-padding: 4.5rem;
  --project-width: calc(100vw - var(--content-horizontal-padding) * 2);

  display: grid;
  grid-template-columns: repeat(var(--columns), var(--project-width));
  gap: calc(var(--gutter) / 2);

  @media ${QUERIES.smAndSmaller} {
    --columns: 1;
    --project-width: 80vw;
  }
  @media (min-width: 563px) {
    --columns: 1;
    --project-width: 80vw;
  }

  @media (min-width: 768px) {
    --columns: 2;
    --project-width: 40vw;
  }
  @media (min-width: 1024px) {
    --columns: 3;
    --project-width: 30vw;
  }
  @media (min-width: 1200px) {
    --columns: 4;
    --project-width: 22vw;
  }
  @media (min-width: 1500px) {
    --columns: 5;
    --project-width: 17vw;
  }
  @media (min-width: 2100px) {
    --columns: 6;
    --project-width: 15vw;
  }
`

const ProjectCardContentInfo = styled.div`
  width: 100%;
  padding: 1rem 1rem 4.5rem 1rem;
  p {
    margin-bottom: 32px;
    color: var(--color-text);
  }
  color: var(--color-text);
  font-weight: ${FONT_WEIGHTS.semibold};
  background: var(--color-hiddenBackgroundOverlay);
  transition: opacity 0.6s ease;
  opacity: 0;
  position: absolute;
  bottom: 0;
`
const ProjectCard = styled.div`
  --border-radius: 5px;
  width: var(--project-width);
  border: 1px solid var(--color-borderPrimary);
  scroll-snap-align: start;
  margin: 16px 0;

  border-radius: var(--border-radius);
  &:hover {
    ${ProjectCardContentInfo} {
      opacity: 1;
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
const ProjectMainImage = styled.img`
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
export default ProjectGrid
