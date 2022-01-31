/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"

import SEO from "../components/SEO"
import MainLayout from "../components/MainLayout"

import BrightTitle from "../components/BrightTitle"

export default function TestingPage() {
  return (
    <>
      <SEO title={`Testing`}></SEO>
      <MainLayout>
        <PageWrapper>
          <HugeP>hello world</HugeP>
          <BrightTitle>Big title</BrightTitle>
        </PageWrapper>
      </MainLayout>
    </>
  )
}

const PageWrapper = styled.div``

const HugeP = styled.p`
  font-size: var(--h1-size);
`
