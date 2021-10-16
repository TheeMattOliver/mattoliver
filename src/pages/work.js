/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { QUERIES } from "../constants"

import ProjectList from "../components/ProjectList"
import MainLayout from "../components/MainLayout"
import SEO from "../components/SEO"
import PageHero from "../components/PageHero"
import TechnologyFilter from "../components/TechnologyFilter"
import Spacer from "../components/Spacer"

export default function WorkPage({ data, pageContext }) {
  const intl = useIntl()
  const projects = data.projects.nodes
  console.log({ projects })
  return (
    <>
      <SEO title={`Work`} lang={intl.locale}></SEO>
      <MainLayout>
        <Wrapper>
          <PageHero>Selected Work - {projects.length} Projects</PageHero>
          <TechnologyFilter activeTechnology={pageContext.technology} />
          <ProjectList projects={projects} />
          <Spacer axis="vertical" size={100} />
        </Wrapper>
      </MainLayout>
    </>
  )
}

export const query = graphql`
  query AllProjectsQuery($technology: [String]) {
    projects: allSanityProject(
      sort: { fields: startedAt, order: DESC }
      filter: {
        technologies: { elemMatch: { title: { in: $technology } } }
        categories: { elemMatch: { title: { nin: "Data Visualization" } } }
      }
    ) {
      nodes {
        id
        previewImage {
          asset {
            id
            altText
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
        tags {
          value
          label
        }
        technologies {
          title
          id
          description
          image {
            caption
            alt
            asset {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
        slug {
          current
        }
        title
        endedAt
        startedAt
        excerpt {
          text {
            _rawChildren(resolveReferences: { maxDepth: 10 })
          }
        }
      }
    }
  }
`

const Wrapper = styled.div`
  position: relative;
`
