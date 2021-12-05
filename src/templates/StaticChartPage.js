import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby-plugin-intl"

import SEO from "../components/SEO"
import MainLayout from "../components/MainLayout"
import Spacer from "../components/Spacer"
import Icon from "../components/Icon"
import PortableText from "../components/PortableText"
import { QUERIES, WEIGHTS } from "../constants"

import { D3PageComponents } from "../components/D3React/components"

export default function StaticChartPage({ data, children, pageContext }) {
  const { title, excerpt, content, relatedData, slug } = data.chart

  // this is terrible:
  data.chart.excerpt.text.map(i => {
    i.markDefs = []
    return i
  })

  relatedData.map(item => {
    item.text &&
      item.text.map(block => {
        block.markDefs = []
        return block
      })
  })

  console.log({ relatedData })

  let PageComponent = D3PageComponents.filter(
    item => item.id === pageContext.slug
  )[0].Component
  const baseRepoURL = `https://github.com/theemattoliver/mattoliver/tree/main`
  return (
    <>
      <SEO title={title}></SEO>
      <MainLayout>
        <ChartPageWrapper>
          <Aside>
            <Link to={`/d3-reference`}>
              <SmallText>&larr; Back</SmallText>
            </Link>
            <ChartTitleWrapper>
              <ChartTitle>{title}</ChartTitle>
            </ChartTitleWrapper>
            <ChartCopy>
              {content &&
                content.map(item => (
                  <PortableText key={item.id} blocks={item._rawText} />
                ))}
            </ChartCopy>

            <DesktopActions>
              <Link to={`/d3-reference/${slug.current}`}>
                <SmallText>View full page &rarr; </SmallText>
              </Link>
              <Spacer axis={`vertical`} size={32} />

              <Divider />

              <ChartRepoInfoWrapper>
                <h6 style={{ textTransform: "uppercase", fontSize: "12px" }}>
                  Git repository
                </h6>
                <a href={`${baseRepoURL}`}>
                  <ChartRepoInfoRow>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 14 14"
                      aria-label="github"
                    >
                      <path
                        d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                        fill="currentColor"
                        fillRule="nonzero"
                      ></path>
                    </svg>
                    <SmallTextStrong>theemattoliver/mattoliver</SmallTextStrong>
                  </ChartRepoInfoRow>
                </a>
                <ChartRepoInfoRow>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    shapeRendering="geometricPrecision"
                    style={{ color: "var(--color-gray300)" }}
                  >
                    <path d="M6 3v12"></path>
                    <circle cx="18" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M18 9a9 9 0 01-9 9"></path>
                  </svg>
                  <SmallText>main</SmallText>
                </ChartRepoInfoRow>
                <ChartRepoInfoRow>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    shapeRendering="geometricPrecision"
                    style={{ color: "var(--color-gray300)" }}
                  >
                    <path d="M2.707 7.454V5.62C2.707 4.725 3.469 4 4.409 4h4.843c.451 0 .884.17 1.204.474l.49.467c.126.12.296.186.473.186h8.399c.94 0 1.55.695 1.55 1.59v.737m-18.661 0h-.354a.344.344 0 00-.353.35l.508 11.587c.015.34.31.609.668.609h17.283c.358 0 .652-.269.667-.61L22 7.805a.344.344 0 00-.353-.35h-.278m-18.662 0h18.662"></path>
                  </svg>
                  <SmallText>components/D3ReactHooks</SmallText>
                </ChartRepoInfoRow>
              </ChartRepoInfoWrapper>

              <a
                href={`${baseRepoURL}/src/pages/d3-reference/${data.chart.slug.current}.js`}
              >
                <SmallText>Fork on Github &rarr; </SmallText>
              </a>
              <Spacer axis={`vertical`} size={32} />
              <Divider />
              {/* <ChartRepoInfoWrapper>
                <h6 style={{ textTransform: "uppercase", fontSize: "12px" }}>
                  Resources
                </h6>
                <a href={relatedData[0].anchor}>
                  <ChartRepoInfoRow>
                    <GatsbyImage
                      alt=""
                      image={relatedData[0].image.asset.gatsbyImageData}
                    />

                    <SmallTextStrong>
                      {relatedData[0].heading}/{relatedData[0].label}
                    </SmallTextStrong>
                  </ChartRepoInfoRow>
                </a> */}
              {/* <ChartRepoInfoRow>
                  <ChartCopy>
                    {relatedData &&
                      relatedData.map(item => (
                        <PortableText key={item.id} blocks={item.text} />
                      ))}
                  </ChartCopy>
                </ChartRepoInfoRow> */}
              {/* </ChartRepoInfoWrapper> */}
              <Spacer axis={`vertical`} size={32} />

              <DesktopBackButtonWrapper>
                <BackButton to="/d3-reference">
                  &larr; Back to Chart Gallery
                </BackButton>
              </DesktopBackButtonWrapper>
            </DesktopActions>
          </Aside>

          <ChartWrapper>
            <PageComponent />
            {children}
          </ChartWrapper>

          <Aside>
            <MobileActions>
              <Spacer axis={`vertical`} size={32} />
              <Link to={`/d3-reference/${slug.current}`}>
                <SmallText>View full page &rarr; </SmallText>
              </Link>
              <Spacer axis={`vertical`} size={32} />

              <Divider />

              <ChartRepoInfoWrapper>
                <h6 style={{ textTransform: "uppercase", fontSize: "12px" }}>
                  Git repository
                </h6>
                <a href={`${baseRepoURL}`}>
                  <ChartRepoInfoRow>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 14 14"
                      aria-label="github"
                    >
                      <path
                        d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                        fill="currentColor"
                        fillRule="nonzero"
                      ></path>
                    </svg>
                    <SmallTextStrong>theemattoliver/mattoliver</SmallTextStrong>
                  </ChartRepoInfoRow>
                </a>
                <ChartRepoInfoRow>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    shapeRendering="geometricPrecision"
                    style={{ color: "var(--color-gray300)" }}
                  >
                    <path d="M6 3v12"></path>
                    <circle cx="18" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M18 9a9 9 0 01-9 9"></path>
                  </svg>
                  <SmallText>main</SmallText>
                </ChartRepoInfoRow>
                <ChartRepoInfoRow>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    shapeRendering="geometricPrecision"
                    style={{ color: "var(--color-gray300)" }}
                  >
                    <path d="M2.707 7.454V5.62C2.707 4.725 3.469 4 4.409 4h4.843c.451 0 .884.17 1.204.474l.49.467c.126.12.296.186.473.186h8.399c.94 0 1.55.695 1.55 1.59v.737m-18.661 0h-.354a.344.344 0 00-.353.35l.508 11.587c.015.34.31.609.668.609h17.283c.358 0 .652-.269.667-.61L22 7.805a.344.344 0 00-.353-.35h-.278m-18.662 0h18.662"></path>
                  </svg>
                  <SmallText>components/D3ReactHooks</SmallText>
                </ChartRepoInfoRow>
              </ChartRepoInfoWrapper>

              <a
                href={`${baseRepoURL}/src/pages/d3-reference/${data.chart.slug.current}.js`}
              >
                <SmallText>
                  Fork the React implementation on Github &rarr;{" "}
                </SmallText>
              </a>
              <Spacer axis={`vertical`} size={32} />
              <Divider />
              <Spacer axis={`vertical`} size={32} />

              <DesktopBackButtonWrapper>
                <BackButton to="/d3-reference">
                  &larr; Back to Chart Gallery
                </BackButton>
              </DesktopBackButtonWrapper>
            </MobileActions>
          </Aside>
        </ChartPageWrapper>
      </MainLayout>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    chart: sanityChart(slug: { current: { eq: $slug } }) {
      id
      tags {
        value
        label
      }
      technologies {
        title
        id
      }
      title
      categories {
        title
      }
      chartTypes {
        title
        id
        image {
          asset {
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
      }
      excerpt {
        _key
        _rawText
        _type
        text {
          _key
          _rawChildren
          _type
          children {
            _key
            _type
            marks
            text
          }
          list
          style
        }
      }
      slug {
        current
        _type
        _key
      }
      relatedData {
        image {
          asset {
            gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            label
            id
          }
        }
        text {
          style
          list
          children {
            _key
            _type
            marks
            text
          }
          _type
          _rawChildren
          _key
        }
        heading
        label
        anchor
      }
      content {
        ... on SanityImageSection {
          _key
          _type
          text {
            _key
            _rawChildren
            _type
            list
            style
            children {
              _key
              _type
              marks
              text
            }
          }
          _rawText
        }
      }
    }
  }
`

const ChartPageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${16 / 16}rem;
  @media ${QUERIES.lgAndLarger} {
    flex-direction: row;
    padding: ${24 / 16}rem;
  }
`
const ChartTitleWrapper = styled.div`
  display: flex;
  @media ${QUERIES.tabletAndUp} {
    padding: 1rem 0;
  }
`
const ChartTitle = styled.h2`
  color: var(--color-textPrimary);
  font-size: 1.45rem;
  font-weight: ${WEIGHTS.normal};
`
const Aside = styled.aside`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  color: var(--color-textPrimary);
  @media ${QUERIES.tabletAndUp} {
  }
`
const DesktopActions = styled.div`
  display: none;
  @media ${QUERIES.lgAndLarger} {
    display: block;
  }
`
const MobileActions = styled.div`
  display: block;
  @media ${QUERIES.lgAndLarger} {
    display: none;
  }
`

const ChartCopy = styled.div`
  min-width: 200px;
  max-width: 450px;
  flex: 0 999999 64px;
  p {
    font-weight: ${WEIGHTS.light};
    margin-top: 1rem;
  }
  a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
  strong {
    font-weight: ${WEIGHTS.medium};
  }
  em {
    font-style: italic;
  }
  @media ${QUERIES.lgAndLarger} {
    flex: 0 999999 200px;
  }
`

const ChartWrapper = styled.div`
  flex: 1;
  height: 100%;
  @media ${QUERIES.lgAndLarger} {
    margin-left: 2rem;
    flex-basis: 550px;
  }
`
const DesktopBackButtonWrapper = styled.div`
  display: none;
  @media ${QUERIES.tabletAndUp} {
    display: block;
    margin-top: auto;
    margin-bottom: 2rem;
  }
`
const BackButton = styled(Link)`
  font-size: 1.125rem;
  filter: saturate(0);
  font-weight: ${WEIGHTS.light};
  /* @media ${QUERIES.laptopAndUp} {
    display: none;
  } */
`
const SmallText = styled.p`
  font-size: 0.875rem;
  font-weight: ${WEIGHTS.light};
`
const SmallTextStrong = styled(SmallText)`
  font-weight: ${WEIGHTS.medium};
`

const Divider = styled.hr`
  border-top: 1px solid var(--color-gray100);
  border-right: 0px;
  border-bottom: 0px;
  border-left: 0px;
  border-image: initial;
  margin: 0px;
`
const ChartRepoInfoWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 1rem 0;
`
const ChartRepoInfoRow = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.5rem;
  align-items: center;
`
