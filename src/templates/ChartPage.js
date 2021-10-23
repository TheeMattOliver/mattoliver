/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import styled, { css } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"

import Header from "../components/Header"
import Footer from "../components/Footer"
import SEO from "../components/SEO"
import MainLayout from "../components/MainLayout"
import { QUERIES, WEIGHTS } from "../constants"
import Spacer from "../components/Spacer"
import UnstyledButton from "../components/UnstyledButton"

export default function ChartPage({ data, title, copy, children }) {
  return (
    <>
      <SEO title={title}></SEO>
      <MainLayout>
        <ChartPageWrapper>
          <ChartCopySection>
            <ChartTitleWrapper>
              <ChartTitle>{title}</ChartTitle>
            </ChartTitleWrapper>
            <ChartCopy>
              <p>{copy}</p>
            </ChartCopy>
            <DesktopBackButtonWrapper>
              <BackButton to="/d3-react-hooks">
                &larr; Back to Chart Gallery
              </BackButton>
            </DesktopBackButtonWrapper>
          </ChartCopySection>
          <ChartWrapper>{children}</ChartWrapper>
        </ChartPageWrapper>
      </MainLayout>
    </>
  )
}

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
