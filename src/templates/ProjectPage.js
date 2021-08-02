/* eslint-disable no-unused-vars */
import React from 'react';
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";


import Header from "../components/Header"
import Footer from "../components/Footer"
import { QUERIES } from "../constants"
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
        <Aside>
          <StickySidebar>
            <h2>Table of Contents</h2>
            <nav>
              <ol>
                <li>Introduction</li>
                <li>Prep</li>
                <li>Cooking</li>
                <li>Reviews</li>
                <li>Introduction</li>
                <li>Prep</li>
                <li>Cooking</li>
                <li>Reviews</li>
                <li>Introduction</li>
                <li>Prep</li>
                <li>Cooking</li>
                <li>Reviews</li>
                <li>Introduction</li>
                <li>Prep</li>
                <li>Cooking</li>
                <li>Reviews</li>
                <li>Introduction</li>
                <li>Prep</li>
                <li>Cooking</li>
                <li>Reviews</li>
                <li>Introduction</li>
                <li>Prep</li>
                <li>Cooking</li>
                <li>Reviews</li>
                <li>Introduction</li>
                <li>Prep</li>
                <li>Cooking</li>
                <li>Reviews</li>
                <li>Introduction</li>
                <li>Prep</li>
                <li>Cooking</li>
                <li>Reviews</li>
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
    'sidebar main'
    'footer footer';
  grid-template-columns: 14rem 1fr;
  gap: 16px;
  /* max-width: 80rem; */
  margin: 0 auto;
  isolation: isolate;
`;

const HeaderWrapper = styled.div`
  grid-area: header;
`;

const FooterWrapper = styled.div`
  grid-area: footer;
`;

const Main = styled.main`
  grid-area: main;
  background-color: var(--color-background);
  display: grid;
  border: solid 1px tomato;
`;

const Aside = styled.aside`
  grid-area: sidebar;
  position: relative;
  z-index: 1;
  border: solid 1px tomato;
`;

const StickySidebar = styled.div`
  position: sticky;
  top: 5.625rem;
`;

