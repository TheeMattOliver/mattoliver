/* eslint-disable no-unused-vars */
import React from 'react';
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

import Header from "../components/Header"
import Footer from "../components/Footer"
import { QUERIES, WEIGHTS } from "../constants"
import Spacer from '../components/Spacer';

const ProjectPage = () => {
  const data = useStaticQuery(graphql`
  query ProjectPageTemplateTitleQuery {
    site {
      siteMetadata {
        title
        siteUrl
        author
      }
    }
  }
`)

  return (
    <>
      <Wrapper>
        <HeaderWrapper>
          <Header title={data.site.siteMetadata.title} />
        </HeaderWrapper>

        <PageTitleWrapper>
          <div>
            <PageTitle>Project Name</PageTitle>
          </div>

        </PageTitleWrapper>

        <Aside>
          <StickySidebar>
            <h2>Table of Contents</h2>
            <nav>
              <ol>
                <li>Introduction</li>
                <li>Purpose & Goal</li>
                <li>Impact</li>
                <li>Background</li>
                <li>Feature Spotlight</li>
                <li>UI Challenges</li>
                <li>Data & Backend Challenges</li>
                <li>Accessibility Challenges</li>
                <li>Current Status</li>
                <li>Learnings & Takeaways</li>
              </ol>
            </nav>
          </StickySidebar>
        </Aside>
        <Main>
          Main Content
          <Spacer axis='vertical' size={1000} />
        </Main>

        <FooterWrapper>
          <Footer data={data.site.siteMetadata} />
        </FooterWrapper>
      </Wrapper>
    </>
  )
}

export default ProjectPage

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'header header'
    'page-title page-title'
    'sidebar main'
    'footer footer';
  grid-template-columns: 100%;
  @media ${QUERIES.laptopAndUp} {
    grid-template-columns: 14rem 1fr;
  }
  gap: 16px;
  margin: 0 auto;
  isolation: isolate;
  color: var(--color-textPrimary);
`;

const HeaderWrapper = styled.div`
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const FooterWrapper = styled.div`
  grid-area: footer;
`;

const PageTitleWrapper = styled.div`
  grid-area: page-title;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding: 5rem 0;
`;

const PageTitle = styled.h1`
  color: var(--color-textPrimary);
  font-weight: ${WEIGHTS.bold};
  font-size: clamp(
    2.2rem,
    3.3vw + 1.25rem,
    3.5rem
  );
`;

const Main = styled.main`
  grid-area: main;
  background-color: var(--color-background);
  display: grid;
  border: solid 1px tomato;
  margin-top: 1rem;
`;

const Aside = styled.aside`
  display: none;
  @media ${QUERIES.laptopAndUp} {
    display: revert;
    grid-area: sidebar;
    position: relative;
    /* z-index: 1; */
    border: solid 1px tomato;
    margin-left: 16px;
    /* table of contents */
    margin-top: 1rem;
    text-align: left;
    h2 {
      font-size: 1.25rem;
      font-weight: ${WEIGHTS.bold}
    }
    li {
      font-size: 1.125;
      filter: saturate(0);
      margin-top: 0.5rem;
      font-weight: ${WEIGHTS.normal}
    }
  }
`;

const StickySidebar = styled.div`
  position: sticky;
  top: 5.825rem;
  /* top: 0; */
`;

