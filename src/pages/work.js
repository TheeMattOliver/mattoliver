/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { QUERIES } from "../constants";

import ProjectList from "../components/ProjectList";
import GridLayout from "../components/GridLayout";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";


export default function WorkPage({ data }) {
  const intl = useIntl()
  const projects = data.projects.nodes
  return (
    <>
      <SEO
        title={`Work`}
        lang={intl.locale}>
      </SEO>
      <GridLayout>
        <Wrapper>
          <PageHero>Selected Work - {projects.length} Projects</PageHero>
          <ProjectList projects={projects} />
        </Wrapper>
      </GridLayout>
    </>
  );
}

export const query = graphql`
  query AllProjectsQuery {
    projects: allSanityProject {
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
          _key
          id
          title
        }
        slug {
          current
        }
        title
        endedAt
      }
    }
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

