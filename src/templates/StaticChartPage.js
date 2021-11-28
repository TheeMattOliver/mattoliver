import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { Link } from "gatsby-plugin-intl"

import SEO from "../components/SEO"
import MainLayout from "../components/MainLayout"
import Spacer from "../components/Spacer"
import Icon from "../components/Icon"
import PortableText from "../components/PortableText"
import { QUERIES, WEIGHTS } from "../constants"

import { D3PageComponents } from "../components/D3ReactHooks/components"

export default function StaticChartPage({ data, children, pageContext }) {
  const { title } = data

  let PageComponent = D3PageComponents.filter(
    item => item.id === pageContext.slug
  )[0].Component

  return (
    <>
      <SEO title={data.chart.title}></SEO>
      <MainLayout>
        <ChartPageWrapper>
          <ChartCopySection>
            <Link to={`/d3-react-hooks`}>
              <SmallNavText>&larr; Back</SmallNavText>
            </Link>
            <ChartTitleWrapper>
              <ChartTitle>{data.chart.title}</ChartTitle>
            </ChartTitleWrapper>
            <ChartCopy>
              {data.chart.excerpt?._rawText && (
                <PortableText blocks={data.chart.excerpt._rawText} />
              )}
            </ChartCopy>
            <Link to={`/d3-react-hooks/${data.chart.slug.current}`}>
              <SmallNavText>View full page &rarr; </SmallNavText>
            </Link>
            <Spacer axis={`vertical`} size={32} />

            <Divider />

            <ChartRepoInfoWrapper>
              <h6 style={{ textTransform: "uppercase", fontSize: "12px" }}>
                Git repository
              </h6>

              <ChartRepoInfo>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 14 14"
                  aria-label="github"
                >
                  <path
                    d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z"
                    fill="currentColor"
                    fill-rule="nonzero"
                  ></path>
                </svg>
              </ChartRepoInfo>
            </ChartRepoInfoWrapper>

            <Divider />
            <Spacer axis={`vertical`} size={32} />

            <DesktopBackButtonWrapper>
              <BackButton to="/d3-react-hooks">
                &larr; Back to Chart Gallery
              </BackButton>
            </DesktopBackButtonWrapper>
          </ChartCopySection>

          <ChartWrapper>
            <PageComponent />
            {children}
          </ChartWrapper>
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
    }
  }
`

const ChartPageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${16 / 16}rem;
  @media ${QUERIES.tabletAndUp} {
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
const ChartCopySection = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  color: var(--color-textPrimary);
  @media ${QUERIES.tabletAndUp} {
  }
`
const ChartCopy = styled.div`
  min-width: 200px;
  max-width: 450px;
  flex: 0 999999 200px;
`

const ChartWrapper = styled.div`
  flex: 1;
  height: 100%;
  @media ${QUERIES.tabletAndUp} {
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
const SmallNavText = styled.p`
  font-size: 0.875rem;
  font-weight: ${WEIGHTS.light};
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
  padding: 2rem 0;
`
const ChartRepoInfo = styled.div`
  display: flex;
  margin-top: 2rem;
`
