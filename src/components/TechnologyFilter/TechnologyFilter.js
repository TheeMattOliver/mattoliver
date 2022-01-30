/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { Link } from "gatsby-plugin-react-intl"
import { COLORS, QUERIES, WEIGHTS } from "../../constants"

function countProjectsInTechnologies(projects) {
  // return the count
  const counts = projects
    .map(project => project.technologies)
    .flat()
    .reduce((acc, technology) => {
      // check if this is an existing technology
      const existingTech = acc[technology.id]
      // if it is, increment by 1
      if (existingTech) {
        existingTech.count += 1
      } else {
        // otherwise, create new entry in acc and set it to one
        acc[technology.id] = {
          id: technology.id,
          title: technology.title,
          count: 1,
        }
      }
      return acc
    }, {})
  // sort based on count
  const sortedTechnologies = Object.values(counts).sort(
    (a, b) => b.count - a.count
  )
  return sortedTechnologies
}

export default function TechnologyFilter({ activeTechnology }) {
  // Get a list of technologies
  // Get a list of projects with those technologies
  const { technologies, projects } = useStaticQuery(graphql`
    query {
      technologies: allSanityTechnology {
        nodes {
          id
          title
        }
      }
      projects: allSanityProject {
        nodes {
          id
          technologies {
            id
            title
          }
        }
      }
    }
  `)
  // console.log({ technologies, projects })
  // Count how many projects are in each technology
  const technologiesWithCounts = countProjectsInTechnologies(projects.nodes)
  // console.log({ technologiesWithCounts })
  // Loop over and display the tag and the count of projects in that technology
  return (
    <Wrapper>
      <Link to="/work">
        <Badge>
          All
          {/* <Count>
            {technologies.nodes.length}
          </Count> */}
        </Badge>
      </Link>
      {technologiesWithCounts.map(technology => {
        return (
          <Link
            to={`/technology/${technology.title}`}
            key={technology.id}
            className={technology.title === activeTechnology ? "active" : ""}
          >
            <Badge>
              {technology.title}
              {/* <Count>
                {technology.count}
              </Count> */}
            </Badge>
          </Link>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  /* margin: 16px; */
  padding: 1rem;

  gap: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  width: clamp(300px, 95%, 750px);
  a {
    border-radius: 0.375rem;
    background-color: var(--color-gray100);
    color: var(--color-gray800);

    &.active {
      background-color: var(--color-gray700);
      color: var(--color-gray50);
    }
    &[aria-current="page"] {
      background-color: var(--color-gray700);
      color: var(--color-gray50);
    }
  }
  /* @media ${QUERIES.tabletAndUp} {
    margin: 1rem 1.5rem;
  } */
  @media ${QUERIES.tabletAndUp} {
    padding: 1rem 2rem;
  }
`

const Badge = styled.span`
  display: inline-flex;
  flex: 1;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: ${WEIGHTS.normal};
`

const Count = styled.span`
  flex-shrink: 0;
  margin-left: 5px;
  height: 1rem;
  width: 1rem;
  font-size: 0.65rem;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.gray200.light};
  color: ${COLORS.gray900.light};
  font-weight: ${WEIGHTS.bold};
`
