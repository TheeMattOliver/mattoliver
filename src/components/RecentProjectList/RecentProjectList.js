import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Link } from "gatsby-plugin-intl";

import styled from "styled-components";

import { QUERIES, TRANSITIONS } from "../../constants";


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
  const sortedSlicedProjects = projects.nodes.sort((a, b) => (b.startedAt > a.startedAt) ? 1 : -1).slice(0, 2)

  console.log({ projects })
  console.log({ sortedSlicedProjects })
  return (
    <Wrapper>
      <SectionTitle>Recent:</SectionTitle>
      <RecentProjectGrid>
        {
          sortedSlicedProjects.map(project => {
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
                      {project.categories.slice(0, -1).map(category => {
                        return (
                          <p key={category.key}>{category.title}</p>
                        )
                      })}
                    </ProjectCategoryWrapper>
                  </ProjectCardFooter>
                </Link>
              </ProjectCardWrapper>
            )
          })
        }
      </RecentProjectGrid>
      <NavBtnWrapper>
        <ProjectNavigationButton to='/work'>
          Browse All Projects  &rarr;
        </ProjectNavigationButton>
      </NavBtnWrapper>
    </Wrapper>

  )
}

const Wrapper = styled.div`
  margin: 1rem;
`;

const SectionTitle = styled.h3`
  color: var(--color-textPrimary);
	padding: 0;
  font-weight: medium;
  font-size: clamp(
    1.5rem,
		2.25vw + .5rem,
    2.5rem
  );
  @media ${QUERIES.laptopAndUp} {
    line-height: 3rem;
    padding: 0;
  }
`;

const RecentProjectGrid = styled.div`
  --min-column-width: min(370px, 100%);
  display: grid;
  grid-template-columns:
    repeat(auto-fill, minmax(var(--min-column-width), 1fr));
  grid-gap: 2rem;
  padding: 16px 0;
  
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
  @media ${QUERIES.desktopAndUp} {
    max-width: none;
    /* grid-gap: 4rem; */
  }
`;
const ProjectCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--color-panelBackground);
  border-radius: 5px;
  flex: 1;

  @media ${QUERIES.tabletAndUp} {
    /* margin: 4rem 3.25rem 4rem 2rem; */
  }
  @media ${QUERIES.laptopAndUp} {
    /* margin: 4rem 3.25rem 4rem 2rem; */
  }
  @media ${QUERIES.desktopAndUp} {
    /* margin: 1rem; */
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
    &:hover {
      text-decoration: underline;
    }
  }
  small, time {
    color: var(--color-textSecondary);
  }
  @media ${QUERIES.tabletAndUp} {
  }
`;

const ProjectCardFooter = styled.div`
  display: block;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 1rem 1rem;
  background: var(--color-background);
  border: .1px solid var(--color-borderPrimary);
  border-top: none;
  border-radius: 0 0 5px 5px;
  h2 {
    font-size: calc(1rem + 1vw);
    display: inline-block;
    margin-bottom: .5rem;
    color: var(--color-textPrimary);
  }
  p {
    color: var(--color-textTertiary);
    font-style: italic;
    margin-top: .25rem;
  }
`;

const ProjectCategoryWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

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
  };
  &::after {
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

const PreviewImage = styled(GatsbyImage)`
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

const NavBtnWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: 2rem;
`;

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
		bottom: -.43rem;
		left: 0;
		background-color: #000;
		transform: scaleX(0);
		transform-origin: top left;
		transition: transform 0.3s ease;	
	}
	&:hover::before {
		transform: scaleX(1);
	}
	&:not(:last-of-type) {
    margin-left: 1rem;
  };
`;