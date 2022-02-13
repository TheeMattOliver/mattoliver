/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"

import SEO from "../components/SEO"
import MainLayout from "../components/MainLayout"

import BrightTitle from "../components/BrightTitle"
import Select from "../components/Select"
import { ChevronDown } from "../components/Icon/ChevronDown"

export default function TestingPage() {
  return (
    <>
      <SEO title={`Testing`}></SEO>
      <MainLayout>
        <PageWrapper>
          <HugeP>hello world</HugeP>
          <BrightTitle>Big title</BrightTitle>
          <Select>
            <option>Test 1</option>
            <option>Test 2</option>
          </Select>
          <ChevronDown color="#000" strokeWidth={2} width={24} />
        </PageWrapper>
      </MainLayout>
    </>
  )
}

const PageWrapper = styled.div``

const HugeP = styled.p`
  font-size: var(--h1-size);
`
