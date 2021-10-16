/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"

import { BREAKPOINTS, TRANSITIONS } from "../../constants"

import SEO from "../../components/SEO"
import MainLayout from "../../components/MainLayout"
import D3ReactProjectList from "../../components/D3ReactHooks/D3ReactProjectList"

export default function D3ReactHooksProjectsHomePage({ data, pageContext }) {
  const intl = useIntl()

  return (
    <>
      <SEO title={`D3 & React hooks`} lang={intl.locale}></SEO>
      <MainLayout>
        <D3ReactProjectList data={data} />
      </MainLayout>
    </>
  )
}

export const query = graphql`
  query AllChartQuery($technology: [String]) {
    charts: allSanityChart(
      filter: {
        categories: { elemMatch: { title: { eq: "Data Visualization" } } }
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
