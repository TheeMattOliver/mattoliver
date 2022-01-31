/* eslint-disable no-unused-vars */
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby-plugin-react-intl"

import styled from "styled-components"

import { QUERIES, TRANSITIONS } from "../../constants"

export default function RecentProjectList() {
  const data = useStaticQuery(graphql`
    query {
      projects: allSanityProject {
        nodes {
          id
          title
          previewImage {
            asset {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
          startedAt
          endedAt
          categories {
            id
            title
          }
          slug {
            current
          }
        }
      }
    }
  `)
  const { projects } = data
  const sortedSlicedProjects = projects.nodes
    .sort((a, b) => (b.startedAt > a.startedAt ? 1 : -1))
    .slice(0, 2)
  return (
    <Wrapper>
      <SectionTitle>Recent work:</SectionTitle>
      <RecentProjectGrid>
        {sortedSlicedProjects.map(project => {
          return (
            <ProjectCardWrapper key={project.id}>
              <Link to={`/work/${project.slug.current}`}>
                <ProjectImageWrapper>
                  <PreviewImage
                    image={project.previewImage?.asset.gatsbyImageData}
                    alt={``}
                  />
                </ProjectImageWrapper>
                <ProjectCardFooter>
                  <h2>{project.title}</h2>
                  <ProjectCategoryWrapper>
                    {project.categories.slice(0, -2).map(category => {
                      return <p key={category.key}>{category.title}</p>
                    })}
                  </ProjectCategoryWrapper>
                </ProjectCardFooter>
              </Link>
            </ProjectCardWrapper>
          )
        })}
      </RecentProjectGrid>
      <NavBtnWrapper>
        <ProjectNavigationButton to="/work">
          Browse Projects &rarr;
        </ProjectNavigationButton>
      </NavBtnWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
  @media ${QUERIES.smAndUp} {
    padding: 2rem 2rem 1.5rem 2rem;
  }
`

const SectionTitle = styled.h3`
  color: var(--color-textPrimary);
  padding: 0;
  font-weight: bold;
  font-size: clamp(1.5rem, 2.25vw + 0.5rem, 2.5rem);
  @media ${QUERIES.laptopAndUp} {
    line-height: 3rem;
    padding: 0rem;
  }
`

const RecentProjectGrid = styled.div`
  --min-column-width: min(440px, 100%);
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(var(--min-column-width), 1fr)
  );
  grid-gap: 2rem;
  padding: 16px 0;

  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
  @media ${QUERIES.desktopAndUp} {
    max-width: none;
    grid-template-columns: repeat(2, minmax(var(--min-column-width), 1fr));
  }
`
const ProjectCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-backgroundOverlay);
  border-radius: 5px;
  flex: 1;

  @media ${QUERIES.smAndUp} {
    /* margin: 64px 52px 64px 32px; */
  }
  @media ${QUERIES.laptopAndUp} {
    /* margin: 64px 52px 64px 32px; */
  }
  @media ${QUERIES.desktopAndUp} {
    /* margin: 16px; */
  }
`

const ProjectCardFooter = styled.div`
  display: block;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 0.75rem;
  background: var(--color-background);
  border: 0.1px solid var(--color-borderPrimary);
  border-top: none;
  border-radius: 0 0 5px 5px;
  h2 {
    font-size: 1rem;
    display: inline-block;
    margin-bottom: 0.5rem;
    color: var(--color-textPrimary);
  }
  p {
    color: var(--color-textTertiary);
    font-style: italic;
    margin-top: 0.25rem;
  }
  @media ${QUERIES.smAndUp} {
    padding: 1rem 1rem;
    h2 {
      font-size: calc(1rem + 1vw);
    }
  }
`

const ProjectCategoryWrapper = styled.div`
  display: flex;
  gap: 16px;
  p {
    font-size: 0.75rem;
  }
  @media ${QUERIES.smAndUp} {
    p {
      font-size: 1rem;
    }
  }
`

const ProjectImageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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

const PreviewImage = styled(GatsbyImage)`
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

const NavBtnWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 2rem 1rem;
  color: var(--color-textPrimary);
  @media ${QUERIES.smAndUp} {
    padding: 2rem 2rem;
  }
`

const ProjectNavigationButton = styled(Link)`
  font-size: 1.25rem;
  text-decoration: none;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 99%;
    height: 1px;
    bottom: -0.43rem;
    left: 0;
    background-color: var(--color-textPrimary);
    transform: scaleX(0);
    transform-origin: top left;
    transition: transform 0.3s ease;
  }
  &:hover::before {
    transform: scaleX(1);
  }
  &:not(:last-of-type) {
    margin-left: 16px;
  }
`
