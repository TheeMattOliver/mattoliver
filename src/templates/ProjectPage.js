/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled, { css } from "styled-components";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby-plugin-intl";
import { GatsbyImage } from "gatsby-plugin-image";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import { QUERIES, WEIGHTS } from "../constants";
import Spacer from '../components/Spacer';
import ImgPlaceholder from '../components/ImgPlaceholder';
import SectionHeader from '../components/SectionHeader';
import PortableText from '../components/PortableText/PortableText';

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

export default function ProjectPage({ data }) {
  const { title, technologies, content, mainImage, _rawContent } = data.project
  const ledeRawText = content[0].text[0]._rawChildren[0].text
  const [hovered, setHovered] = useState(false)
  return (
    <>
      <SEO
        title={title}>
      </SEO>
      <Wrapper>
        <HeaderWrapper>
          <Header title={`Matt Oliver`} />
        </HeaderWrapper>

        <PageTitleWrapper>
          <PageTitle>{title}</PageTitle>
        </PageTitleWrapper>

        <Aside>
          <TechListWrapper>
            <h2>Technologies</h2>
            <ul>
              {
                technologies.map(item => {
                  return (
                    <TechListItem key={item._key}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item.title}
                    </TechListItem>
                  )
                })
              }
            </ul>
          </TechListWrapper>

          <StickySidebar>
            <h2>Table of Contents</h2>
            <TableOfContents>
              <ol>
                {/* remove the lede & excerpt */}
                {content.slice(2).map(item => {
                  return (
                    <li key={item._key}>
                      <a
                        href={`#${item.anchor}`}
                      >
                        {item.heading}
                      </a>
                    </li>
                  )
                })}
              </ol>
            </TableOfContents>
            <DesktopBackButton to='/work'>
              &larr; Back to Projects
            </DesktopBackButton>
          </StickySidebar>
        </Aside>

        <Main>
          <LedeWrapper>
            <LedeText>{ledeRawText}</LedeText>

            <ImageWrapper>
              <GatsbyImage
                image={mainImage?.asset?.gatsbyImageData}
                alt={''}
              />
            </ImageWrapper>
          </LedeWrapper>

          {/* todo: make this smooth scroll to anchor */}
          {content.slice(2).map(item => {
            console.log({ content })
            return (
              <Section key={item._key}>
                <SectionHeaderWrapper>
                  <SectionHeader key={item._key} id={`${item.anchor}`}>
                    <SectionHeaderAnchor href={`#${item.anchor}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                      <SectionHeaderIconWrapper hovered={hovered}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </SectionHeaderIconWrapper>
                      {item.heading}
                    </SectionHeaderAnchor>
                  </SectionHeader>
                </SectionHeaderWrapper>

                <SectionImageContainer>
                  <SectionImageWrapper>
                    <SectionMainImage
                      image={item.image?.asset.gatsbyImageData}
                      alt={``}
                    />
                  </SectionImageWrapper>
                </SectionImageContainer>

                <SectionCopyWrapper>
                  {item._rawText && <PortableText blocks={item._rawText} />}
                </SectionCopyWrapper>

                {/* 
                <SectionCopyWrapper key={item._key}>
                  {item.text.map((graf, index) => {
                    console.log({ graf })
                    graf.markDefs = [];

                    return (
                      <>
                        <SectionCopyGraf key={graf._key}>
                          {graf._rawChildren[0]?.text}
                          {graf._rawChildren[1]?.text}
                          {graf._rawChildren[2]?.text}
                          {graf._rawChildren[3]?.text}
                        </SectionCopyGraf>
                        <br />
                      </>
                    )
                  })}
                </SectionCopyWrapper> 
                */}

                <Spacer axis='vertical' size={80} />
              </Section>
            )
          })}

          <MobileBackButton to='/work'>
            &larr; Back to Projects
          </MobileBackButton>

        </Main>

        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Wrapper>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    project: sanityProject(slug: {current: {eq: $slug}}) {
      id
      title
      author {
        id
        name
        image {
          asset {
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
      }
      categories {
        title
        _key
      }
      mainImage {
        asset {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          id
          title
          altText
        }
      }
      publishedAt
      technologies {
        title
        id
      }
      tags {
        value
        label
      }
      slug {
        current
      }
      content {
        ... on SanityImageSection {
          _key
          _type
          _rawText
          label
          heading
          anchor
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              altText
              assetId
            }
          }
          text {
            _rawChildren(resolveReferences: {maxDepth: 10})
            _key
            children {
              _key
              _type
              marks
              text
            }
            _type
          }
        }
        ... on SanityTextSection {
          _key
          _type
          label
          heading
          text {
            _key
            _rawChildren(resolveReferences: {maxDepth: 10})
          }
        }
      }
      startedAt
      endedAt
      _rawContent(resolveReferences: {maxDepth: 10})
    }
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'header header'
    'page-title page-title'
    'main main'
    'footer footer';
  grid-template-columns: 1fr;
  gap: 16px;
  margin: 0 auto;
  isolation: isolate;
  color: var(--color-textPrimary);
  @media ${QUERIES.laptopAndUp} {
    grid-template-areas:
      'header header'
      'page-title page-title'
      'sidebar main'
      'footer footer';
    grid-template-columns: 14rem 1fr;
  }
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
  padding: 0 1rem;
  @media ${QUERIES.tabletAndUp} {
    padding: 5rem 0;
  }
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
  @media ${QUERIES.tabletAndUp} {
    margin: 1rem 1rem 0 1rem;
  }
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
      /* filter: saturate(0); */
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
  line-height: 1.5rem;
  padding: 0 1rem;
  font-size: clamp(
    1rem,
    /* 1.3vw + .9rem, */
    1.25vw + .5rem,
    1.45rem
  );
  width: clamp(300px, 95%, 65ch);  
  @media ${QUERIES.tabletAndUp} {
    padding: 0 1.5rem;
    margin-bottom: 1.5rem;
  }
`;
const Section = styled.section`
  position: relative;
  background: var(--color-backgroundPrimary);
  display: grid;
  grid-template-areas:
    'header'
    'image'
    'copy';
  grid-template-columns: 1fr;
  gap: 16px;
  @media ${QUERIES.tabletAndUp} {
    grid-template-areas:
    'header image'
    'header copy';
    grid-template-columns: 1fr 3fr;
    margin-top: 2rem;
    &:last-of-type {
      margin-bottom: 4rem;
    }
  }
`;

const SectionHeaderWrapper = styled.div`
  grid-area: header;
  @media ${QUERIES.tabletAndUp} {  
    line-height: 2rem;
    margin-bottom: 2rem;
    position: sticky;
    top: 8rem;
    align-self: flex-start;
  }
`;
const SectionHeaderAnchor = styled.a`
  svg {
    position: absolute; 
    left: -10px;
    transform: translateY(50%);
    opacity: .45; 
    scroll-margin-top: 128px;
    transition: opacity 250ms ease 0s;
  }
`;

const SectionHeaderIconWrapper = styled.div`
  ${SectionHeaderAnchor}:hover ~ & {
    opacity: 1;
  }
`;

const SectionCopyWrapper = styled.div`
  grid-area: copy;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: ${WEIGHTS.thin};
  p {
    color: var(--color-textPrimary);
    margin-top: .75rem;
    line-height: 1.25rem;
    padding: 0 1rem;
    font-size: clamp(
      1rem,
      1.25vw + .5rem,
      1.45rem
    );
    @media ${QUERIES.tabletAndUp} {
      line-height: 1.75rem;
      padding: 0 1.5rem;
    }
    width: clamp(300px, 95%, 65ch);  
  }
  p > a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
  pre {
    padding: 1.375rem!important;
    margin: 2rem 1rem!important;
    @media ${QUERIES.tabletAndUp} {
      margin: 2rem 1.5rem!important;
    }
  }
  code {
    font-size: clamp(
      1rem,
      1.45vw,
      1.65rem
    )!important;
  }
  strong {
    font-weight: ${WEIGHTS.bold};
  }
  em {
    font-style: italic;
  }
  @media ${QUERIES.tabletAndUp} {
    margin-top: 2rem;
  }
`;

const SectionCopyGraf = styled.p`
  color: var(--color-textPrimary);
	margin-top: .75rem;
	line-height: 1.25rem;
  padding: 0 1rem;
  font-size: clamp(
    1rem,
		1.25vw + .5rem,
    1.45rem
  );
  @media ${QUERIES.tabletAndUp} {
    line-height: 1.75rem;
    padding: 0 1.5rem;
  }

  width: clamp(300px, 95%, 65ch);  
`;

const StickySidebar = styled.div`
  position: sticky;
  /* position: -webkit-sticky; */
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

const ImageWrapper = styled.div`
  border: solid 1px var(--color-borderPrimary);
  border-radius: 3px;
  padding: 16px;
  margin: 0 1rem 1rem 1rem;
  /* filter: drop-shadow(1px 2px 3px var(--color-gray300)); */
  flex: 1;
`;

const SectionImageContainer = styled.div`
  grid-area: image;
  border: solid 1px var(--color-borderPrimary);
  border-radius: 3px;
  padding: .25rem;
  margin: 0 1rem;
  /* filter: drop-shadow(1px 2px 3px var(--color-gray300)); */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${QUERIES.tabletAndUp} {
    margin: 0 1rem 1rem 1rem;
  }
`;

const SectionImageWrapper = styled.div`
  border-radius: 3px;
  padding: 1rem;
  display: flex;
  flex: 1;
  height: 400px;
`;

const SectionMainImage = styled(GatsbyImage)`
  object-fit: scale-down;
  width: 100%;
`;