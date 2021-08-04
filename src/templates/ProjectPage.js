/* eslint-disable no-unused-vars */
import React from 'react';
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby-plugin-intl";
import Header from "../components/Header"
import Footer from "../components/Footer"
import { QUERIES, WEIGHTS } from "../constants"
import Spacer from '../components/Spacer';
import ImgPlaceholder from '../components/ImgPlaceholder';
import SectionHeader from '../components/SectionHeader';

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
          <PageTitle>Project Name</PageTitle>
        </PageTitleWrapper>

        <Aside>
          <TechListWrapper>
            <h2>Technologies</h2>
            <ul>
              <TechListItem>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Javascript
              </TechListItem>
              <TechListItem>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                React
              </TechListItem>
              <TechListItem>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Angular
              </TechListItem>
              <TechListItem>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                SQL
              </TechListItem>
            </ul>
          </TechListWrapper>

          <StickySidebar>
            <h2>Table of Contents</h2>
            <TableOfContents>
              <ol>
                <li>
                  <a href="#introduction">
                    Introduction
                  </a>
                </li>
                <li>Purpose & Goal</li>
                <li>Impact</li>
                <li>Background</li>
                <li>Feature Spotlight</li>
                <li>UI Challenges</li>
                <li>Data & Backend Challenges</li>
                <li>Accessibility Challenges</li>
                <li>Current Status</li>
                <li>
                  <a href="#takeaways">
                    Learnings & Takeaways
                  </a>
                </li>
              </ol>
            </TableOfContents>
            <DesktopBackButton to='/'>
              &larr; Back to Projects
            </DesktopBackButton>
          </StickySidebar>
        </Aside>

        <Main>
          <LedeWrapper>
            <LedeText>Platea dictumst vestibulum rhoncus est. Viverra orci sagittis eu volutpat odio facilisis mauris sit. Accumsan sit amet nulla facilisi.</LedeText>
            <ImgPlaceholder />
          </LedeWrapper>


          <Section>
            <SectionHeaderWrapper >
              <SectionHeader id={`introduction`}>
                Introduction
              </SectionHeader>
            </SectionHeaderWrapper>
            <ImgPlaceholder />
            <Spacer axis='vertical' size={1000} />
          </Section>

          <Section>
            <SectionHeaderWrapper >
              <SectionHeader id={`purpose`}>
                Purpose & Goal
              </SectionHeader>
            </SectionHeaderWrapper>
            <ImgPlaceholder />
            <Spacer axis='vertical' size={1000} />
          </Section>

          <Section>
            <SectionHeaderWrapper >
              <SectionHeader id={`impact`}>
                Impact
              </SectionHeader>
            </SectionHeaderWrapper>
            <ImgPlaceholder />
            <Spacer axis='vertical' size={1000} />
          </Section>

          <Spacer axis='vertical' size={1000} />
          <Spacer axis='vertical' size={300} />

          <Section>
            <SectionHeaderWrapper >
              <SectionHeader id={`takeaways`}>
                Takeaways
              </SectionHeader>
            </SectionHeaderWrapper >
            <ImgPlaceholder />
          </Section>

          <MobileBackButton to='/work'>
            &larr; Back to Projects
          </MobileBackButton>

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
  'main main'
  'footer footer';
  grid-template-columns: 1fr;
  @media ${QUERIES.laptopAndUp} {
      grid-template-areas:
      'header header'
      'page-title page-title'
      'sidebar main'
      'footer footer';
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

const PageTitleBackground = styled.div`
  object-fit: cover;
  background-color: #e6f6f7;
  opacity: 0.4;
  background-image:  linear-gradient(#70b2e8 0.8px, transparent 0.8px), linear-gradient(90deg, #70b2e8 0.8px, transparent 0.8px), linear-gradient(#70b2e8 0.4px, transparent 0.4px), linear-gradient(90deg, #70b2e8 0.4px, #e6f6f7 0.4px);
  background-size: 20px 20px, 20px 20px, 4px 4px, 4px 4px;
  background-position: -0.8px -0.8px, -0.8px -0.8px, -0.4px -0.4px, -0.4px -0.4px;
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
  /* border: solid 1px tomato; */
  margin: 1rem 1rem 0 1rem;
  @media ${QUERIES.laptopAndUp} {
  }
`;

const Aside = styled.aside`
  display: none;
  @media ${QUERIES.laptopAndUp} {
    display: revert;
    grid-area: sidebar;
    position: relative;
    /* border: solid 1px tomato; */
    margin-left: 16px;
    /* table of contents */
    margin-top: 1rem;
    text-align: left;
    h2 {
      font-size: 1.45rem;
      font-weight: ${WEIGHTS.medium}
    }
    li {
      font-size: 1.125;
      filter: saturate(0);
      margin-top: 0.5rem;
      font-weight: ${WEIGHTS.normal}
    }
  }
`;

const TableOfContents = styled.nav`
  margin-bottom: 4rem;
`;
const MobileBackButton = styled(Link)`
  margin-top: 4rem;
  margin-left: 1rem;
  font-size: 1.125;
  filter: saturate(0);
  margin-top: 0.5rem;
  font-weight: ${WEIGHTS.normal};
  @media ${QUERIES.laptopAndUp} {
    display: none;
  }
`;

const DesktopBackButton = styled(Link)`
`;
const LedeWrapper = styled.div`

`;

const LedeText = styled.p`
  color: var(--color-textPrimary);
  margin-top: .75rem;
  margin-bottom: .75rem;
  padding: 0 1.5rem;
  line-height: 1.5rem;
  font-size: clamp(
    1rem,
    /* 1.3vw + .9rem, */
    1.25vw + .5rem,
    1.45rem
  );
`;
const Section = styled.section`
  position: relative;
  display: flex;
  align-items: flex-start;
  /* min-height: 400px; */
  background: var(--color-backgroundPrimary);
  margin-top: 2rem;
  &:last-of-type {
    margin-bottom: 4rem;
  }
`;
const SectionHeaderWrapper = styled.div`
  margin-bottom: 2rem;
  position: sticky;
  top: 8rem;
`;

const StickySidebar = styled.div`
  position: sticky;
  top: 8rem;
`;

const TechListWrapper = styled.div`
  margin-bottom: 1rem;
  margin-top: .75rem;
`;

const TechListItem = styled.li`
  display: flex;
  align-items: center;
`;
