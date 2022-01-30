/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import styled, { css } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby-plugin-react-intl"
import { GatsbyImage } from "gatsby-plugin-image"

import Header from "../components/Header"
import Footer from "../components/Footer"
import SEO from "../components/SEO"
import { QUERIES, WEIGHTS } from "../constants"
import Spacer from "../components/Spacer"
import SectionHeader from "../components/SectionHeader"
import PortableText from "../components/PortableText/PortableText"
import TableOfContents from "../components/TableOfContents"
import TechList from "../components/TechList"

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
      <SEO title={title}></SEO>
      <Wrapper>
        <HeaderWrapper>
          <Header title={`Matt Oliver`} />
        </HeaderWrapper>

        <PageTitleWrapper>
          <PageTitle>{title}</PageTitle>
        </PageTitleWrapper>

        <Aside>
          <TechList technologies={technologies} />

          <StickySidebar>
            {/* if there's only one section, we don't render a table of contents */}
            {content.filter(item => item._type === "imageSection").length >
            1 ? (
              <div>
                <h2>Table of Contents</h2>
                <TableOfContents content={content} />
              </div>
            ) : null}

            <DesktopBackButton to="/work">
              &larr; Back to Projects
            </DesktopBackButton>
          </StickySidebar>
        </Aside>

        <Main>
          <LedeWrapper>
            <LedeText>{ledeRawText}</LedeText>
            <MainImageWrapper>
              <GatsbyImage image={mainImage?.asset?.gatsbyImageData} alt={""} />
            </MainImageWrapper>
          </LedeWrapper>

          {/* todo: make this smooth scroll to anchor */}
          {content.slice(1).map(item => {
            return (
              <Section key={item._key} id={`${item.anchor}`}>
                <SectionHeaderWrapper>
                  <SectionHeader key={item._key} id={`${item.anchor}`}>
                    <SectionHeaderAnchor
                      href={`#${item.anchor}`}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <SectionHeaderIconWrapper hovered={hovered}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          />
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
                <Spacer axis="vertical" size={40} />
              </Section>
            )
          })}

          <MobileBackButton to="/work">
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
    project: sanityProject(slug: { current: { eq: $slug } }) {
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
        description
        image {
          caption
          alt
          asset {
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
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
            _rawChildren(resolveReferences: { maxDepth: 10 })
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
            _rawChildren(resolveReferences: { maxDepth: 10 })
          }
        }
      }
      startedAt
      endedAt
      _rawContent(resolveReferences: { maxDepth: 10 })
    }
  }
`

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "header header"
    "page-title page-title"
    "main main"
    "footer footer";
  grid-template-columns: 1fr;
  gap: 16px;
  margin: 0 auto;
  isolation: isolate;
  color: var(--color-textPrimary);
  @media ${QUERIES.laptopAndUp} {
    grid-template-areas:
      "header header"
      "page-title page-title"
      "sidebar main"
      "footer footer";
    /* grid-template-columns: 14rem 1fr; */
    grid-template-columns:
      minmax(50px, 14rem)
      minmax(250px, 4fr);
  }
`

const HeaderWrapper = styled.div`
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 2;
`

const FooterWrapper = styled.div`
  grid-area: footer;
`

const PageTitleWrapper = styled.div`
  grid-area: page-title;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  gap: 16px;
  display: flex;
  @media ${QUERIES.tabletAndUp} {
    padding: 5rem 0;
  }
`

const PageTitleBackground = styled.div`
  object-fit: cover;
  background-color: #e6f6f7;
  opacity: 0.4;
  background-image: linear-gradient(#70b2e8 0.8px, transparent 0.8px),
    linear-gradient(90deg, #70b2e8 0.8px, transparent 0.8px),
    linear-gradient(#70b2e8 0.4px, transparent 0.4px),
    linear-gradient(90deg, #70b2e8 0.4px, #e6f6f7 0.4px);
  background-size: 20px 20px, 20px 20px, 4px 4px, 4px 4px;
  background-position: -0.8px -0.8px, -0.8px -0.8px, -0.4px -0.4px,
    -0.4px -0.4px;
`

const PageTitle = styled.h1`
  color: var(--color-textPrimary);
  font-weight: ${WEIGHTS.ultrabold};
  font-size: clamp(2.2rem, 3.3vw + 1.25rem, 3.5rem);
`

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
`

const Aside = styled.aside`
  display: none;
  @media ${QUERIES.laptopAndUp} {
    display: revert;
    grid-area: sidebar;
    position: relative;
    /* border: solid 1px tomato; */
    margin-left: 16px;
    /* table of contents */
    margin-top: 16px;
    text-align: left;
    h2 {
      font-size: 1.45rem;
      font-weight: ${WEIGHTS.medium};
    }
    li {
      font-size: 1.125;
      /* filter: saturate(0); */
      margin-top: 1.25rem;
      margin-left: 4px;
      font-weight: ${WEIGHTS.normal};
    }
  }
`

const MobileBackButton = styled(Link)`
  margin-top: 4rem;
  margin-left: 16px;
  font-size: 1.125;
  filter: saturate(0);
  margin-top: 8px;
  font-weight: ${WEIGHTS.normal};
  @media ${QUERIES.laptopAndUp} {
    display: none;
  }
`

const DesktopBackButton = styled(Link)``
const LedeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const LedeText = styled.p`
  color: var(--color-textPrimary);
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  line-height: 1.5rem;
  padding: 0 1rem;
  font-size: clamp(1rem, /* 1.3vw + .9rem, */ 1.25vw + 0.5rem, 1.45rem);
  width: clamp(300px, 95%, 65ch);
  @media ${QUERIES.tabletAndUp} {
    padding: 0 1.5rem;
    margin-bottom: 1.5rem;
  }
`
const Section = styled.section`
  position: relative;
  background: var(--color-backgroundPrimary);
  display: grid;
  grid-template-areas:
    "header"
    "image"
    "copy";
  grid-template-columns: 1fr;
  gap: 16px;
  @media ${QUERIES.tabletAndUp} {
    grid-template-areas:
      "header image"
      "header copy";
    grid-template-columns:
      minmax(50px, 1fr)
      minmax(250px, 3fr);
    margin-top: 1.25rem;
    &:last-of-type {
      margin-bottom: 56px;
    }
  }
`

const SectionHeaderWrapper = styled.div`
  grid-area: header;
  @media ${QUERIES.tabletAndUp} {
    line-height: 2rem;
    margin-bottom: 32px;
    position: sticky;
    top: 8rem;
    align-self: flex-start;
  }
`

const SectionHeaderIconWrapper = styled.div`
  svg {
    position: absolute;
    left: -10px;
    transform: translateY(50%);
    opacity: 0;
    scroll-margin-top: 128px;
    transition: opacity 250ms ease 0s;
  }
`

const SectionHeaderAnchor = styled.a`
  svg {
    display: none;
  }
  @media ${QUERIES.tabletAndUp} {
    &:hover ${SectionHeaderIconWrapper} {
      svg {
        display: revert;
        opacity: 1;
      }
    }
  }
`

const SectionCopyWrapper = styled.div`
  grid-area: copy;
  font-size: 1.125rem;
  line-height: 1.5rem;
  font-weight: ${WEIGHTS.light};
  p {
    color: var(--color-textPrimary);
    margin-top: 0.75rem;
    line-height: 1.25rem;
    padding: 0 1rem;
    font-size: clamp(1rem, 1.25vw + 0.5rem, 1.45rem);
    @media ${QUERIES.tabletAndUp} {
      line-height: 1.75rem;
      padding: 0 1.5rem;
    }
  }
  p > strong {
    text-decoration: underline;
    &:hover {
      color: var(--color-textLink);
    }
  }
  p > a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
  pre {
    max-width: 340px;
    padding: 1.375rem !important;
    margin: 2rem 1rem !important;
    @media ${QUERIES.tabletAndUp} {
      margin: 2rem 1.5rem !important;
      max-width: 90%;
    }
  }
  code {
    /* font-size: clamp(
      1rem,
      1.45vw,
      1.65rem
    )!important; */
    position: relative;
    display: inline;
    font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console,
      monospace;
    font-size: 0.9em;
    letter-spacing: -0.5px;
    padding: 4px 6px;
    margin: 1px -1px;
    line-height: 1.25rem;
    background: rgba(115, 125, 140, 0.17);
    border-radius: 3px;
    -webkit-box-decoration-break: clone;
  }
  pre code {
    position: revert;
    display: revert;
    font-family: Menlo, Consolas, Monaco, Liberation Mono, Lucida Console,
      monospace;
    font-size: revert;
    letter-spacing: revert;
    padding: revert;
    margin: revert;
    background: revert;
    border-radius: revert;
    -webkit-box-decoration-break: revert;
  }
  strong {
    font-weight: ${WEIGHTS.medium};
  }
  em {
    font-style: italic;
  }
  figure {
    border: solid 1px var(--color-borderPrimary);
    border-radius: 3px;
    padding: 16px;
    margin: 1rem;
    object-fit: cover;
    /* filter: drop-shadow(1px 2px 3px var(--color-gray300)); */
    flex: 1;
  }

  iframe {
    max-width: 320px;
    margin-left: 25px;
    width: 550px;
    height: 339.16666666667px;
  }
  @media ${QUERIES.tabletAndUp} {
    margin-top: 1.25rem;
    iframe {
      margin-top: 24px;
      max-width: 500px;
      margin-left: 80px;
      width: 650px;
      height: 400.83333333333px;
    }
  }
  @media ${QUERIES.laptopAndUp} {
    iframe {
      margin-left: 80px;
      width: 800px;
      height: 493.33333333333px;
    }
  }
  @media ${QUERIES.desktopAndUp} {
    iframe {
      margin-left: 160px;
      width: 800px;
      height: 493.33333333333px;
    }
  }
`

const SectionCopyGraf = styled.p`
  color: var(--color-textPrimary);
  margin-top: 0.75rem;
  line-height: 1.25rem;
  padding: 0 1rem;
  font-size: clamp(1rem, 1.25vw + 0.5rem, 1.45rem);
  @media ${QUERIES.tabletAndUp} {
    line-height: 1.75rem;
    padding: 0 1.5rem;
  }
  width: clamp(300px, 95%, 65ch);
`

const StickySidebar = styled.div`
  position: sticky;
  /* position: -webkit-sticky; */
  top: 8rem;
`

const ImageWrapper = styled.div`
  border: solid 1px var(--color-borderPrimary);
  border-radius: 3px;
  padding: 16px;
  margin: 0 1rem 1rem 1rem;
  object-fit: cover;
  /* filter: drop-shadow(1px 2px 3px var(--color-gray300)); */
  flex: 1;
`

const MainImageWrapper = styled.div`
  border: solid 1px var(--color-borderPrimary);
  border-radius: 3px;
  padding: 16px;
  margin: 0 1rem 1rem 1rem;
  object-fit: cover;
  flex: 1;
`

const SectionImageContainer = styled.div`
  grid-area: image;
  border: solid 1px var(--color-borderPrimary);
  border-radius: 3px;
  padding: 0.25rem;
  margin: 0 1rem;
  /* filter: drop-shadow(1px 2px 3px var(--color-gray300)); */
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${QUERIES.tabletAndUp} {
    margin: 0 1rem 1rem 1rem;
  }
`

const SectionImageWrapper = styled.div`
  border-radius: 3px;
  display: flex;
  flex: 1;
  img {
    flex: 1;
    width: 100%;
    min-width: 300px;
  }
`

const SectionMainImage = styled(GatsbyImage)`
  /* object-fit: scale-down; */
`

/* until aspect-ratio is supported*/
const PaddingHack = styled.div`
  height: 0px;
  padding-bottom: 100%;
  position: relative;
`
