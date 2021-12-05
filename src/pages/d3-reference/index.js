/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import SEO from "../../components/SEO"
import MainLayout from "../../components/MainLayout"
import D3ReactProjectList from "../../components/D3React/D3ReactProjectList"
import ChartFilter from "../../components/ChartFilter"

export default function D3ReactHooksProjectsHomePage({ data, pageContext }) {
  const intl = useIntl()

  return (
    <>
      <SEO title={`D3 Reference`} lang={intl.locale}></SEO>
      <MainLayout>
        <Wrapper>
          <ChartFilter />
          <D3ReactProjectList data={data} />
        </Wrapper>
      </MainLayout>
    </>
  )
}

export const query = graphql`
  query AllChartQuery($chartType: [String], $technology: [String]) {
    charts: allSanityChart(
      filter: {
        categories: { elemMatch: { title: { eq: "Data Visualization" } } }
        chartTypes: { elemMatch: { title: { in: $chartType } } }
        technologies: { elemMatch: { title: { in: $technology } } }
      }
    ) {
      edges {
        node {
          id
          title
          technologies {
            _id
            _key
            id
            title
            image {
              asset {
                gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              }
              caption
              alt
            }
          }
          categories {
            title
          }
          publishedAt
          slug {
            current
          }
          excerpt {
            text {
              children {
                text
                marks
                _type
                _key
              }
              _rawChildren(resolveReferences: { maxDepth: 10 })
            }
          }
          previewImage {
            asset {
              altText
              gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
              id
            }
          }
          mainImage {
            asset {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
              id
              altText
            }
          }
        }
      }
    }
  }
`
const Wrapper = styled.div`
  position: relative;
`
