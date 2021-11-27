/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"

import SEO from "../components/SEO"
import MainLayout from "../components/MainLayout"
import PortableText from "../components/PortableText"
import { QUERIES, WEIGHTS } from "../constants"

export default function StaticChartPage({ data, children, pageContext }) {
  console.log({ data })
  const { title } = data
  console.log({ pageContext })
  return (
    <>
      <SEO title={data.chart.title}></SEO>
      <MainLayout>
        <ChartPageWrapper>
          <ChartCopySection>
            <ChartTitleWrapper>
              <ChartTitle>{data.chart.title}</ChartTitle>
            </ChartTitleWrapper>
            <ChartCopy>
              {data.chart.excerpt?._rawText !== null && (
                <PortableText blocks={data.chart.excerpt._rawText} />
              )}
            </ChartCopy>
            <DesktopBackButtonWrapper>
              <BackButton to="/d3-react-hooks">
                &larr; Back to Chart Gallery
              </BackButton>
            </DesktopBackButtonWrapper>
          </ChartCopySection>

          <ChartWrapper>
            <h1>chart goes here</h1>
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
    }
  }
`

const ChartPageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1rem;
  @media ${QUERIES.tabletAndUp} {
    flex-direction: row;
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
  font-weight: ${WEIGHTS.medium};
`
const ChartCopySection = styled.div`
  margin-right: 1rem;
  margin-left: 1rem;
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
  font-size: 1.125;
  filter: saturate(0);
  font-weight: ${WEIGHTS.normal};
  /* @media ${QUERIES.laptopAndUp} {
    display: none;
  } */
`
