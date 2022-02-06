/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import { useIntl } from "gatsby-plugin-react-intl"
import { GatsbyImage } from "gatsby-plugin-image"

import SEO from "../components/SEO"
import MainLayout from "../components/MainLayout"
import { PageHeroTitle, HeroCopySubheading } from "../components/PageHero"
import WavingHand from "../components/WavingHand"
import PortableText from "../components/PortableText"

import { PageHero } from "../components/PageHero"

import { QUERIES } from "../constants"
import Spacer from "../components/Spacer"
import HeroButtonGroup from "../components/HeroButtonGroup"
import RecentProjectList from "../components/RecentProjectList"

export default function HomePage({ data }) {
  const intl = useIntl()
  if (!data) return

  const { cmsPageData } = data
  const cmsHomePageCopy = cmsPageData.content
  const imgUrl = cmsPageData.openGraphImage?.asset.gatsbyImageData
  const imgAltText = cmsPageData.openGraphImage?.alt

  const homeHeroTitle = "Hi, I'm Matt."
  const subheadingText =
    "This is fallback text. We only want this to render if there's no data from the CMS to render."

  return (
    <>
      <SEO title={`Home`} lang={intl.locale}></SEO>
      <MainLayout>
        <PageWrapper>
          <FlexWrapper>
            {/* Mobile Pic */}
            <MobileImgWrapper>
              <AboutImg image={imgUrl} alt={imgAltText} />
            </MobileImgWrapper>
            {/* Hero */}
            <PageHero
              heading={homeHeroTitle}
              subheading={subheadingText}
              cmsData={cmsHomePageCopy}
            />

            {/* Pic */}
            <ImgWrapper>
              <AboutImg image={imgUrl} alt={imgAltText} />
            </ImgWrapper>
          </FlexWrapper>

          <HeroButtonGroup />
          <Spacer axis="vertical" size={80} />

          {/* Recent projects */}
          <RecentProjectList />
        </PageWrapper>
      </MainLayout>
    </>
  )
}
export const query = graphql`
  query HomePage {
    cmsPageData: sanityPage(title: { eq: "Home" }) {
      id
      openGraphImage {
        alt
        asset {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          title
        }
      }
      content {
        ... on SanityTextSection {
          _key
          _type
          text {
            _key
            _rawChildren
            _type
            children {
              text
              marks
              _type
              _key
            }
          }
          heading
          _rawText
        }
      }
    }
  }
`
const PageWrapper = styled.div``
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  @media ${QUERIES.smAndUp} {
    flex-direction: row;
  }
`
const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  @media ${QUERIES.smAndUp} {
    display: revert;
    padding: 0 1.75rem;
  }
`
const HeroCopyWrapper = styled.div`
  padding-top: 16px;
  @media ${QUERIES.lgAndUp} {
    max-width: 80rem;
  }
`

const MobileImgWrapper = styled.div`
  width: 100px;
  height: 100px;
  justify-self: center;
  align-self: center;
  margin-top: 24px;
  border-radius: 50%;
  background: transparent;
  @media ${QUERIES.smAndUp} {
    display: none;
  }
`

const ImgWrapper = styled.div`
  display: none;
  @media ${QUERIES.smAndUp} {
    display: block;
    width: 400px;
    height: 300px;
    margin-top: 50px;
    margin-right: 150px;
    border-radius: 50%;
  }
`

const AboutImg = styled(GatsbyImage)`
  border-radius: 50%;
  filter: drop-shadow(0px 0px 25px hsl(0deg 0% 0% / 0.3));
  img {
    border-radius: 50%;
    /* filter: drop-shadow(0px 0px 25px hsl(0deg 0% 0% / 0.3)); */
  }
`
