/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import { useIntl } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"

import SEO from "../components/SEO"
import MainLayout from "../components/MainLayout"
import PageHero from "../components/PageHero"
import WavingHand from "../components/WavingHand"
import PortableText from "../components/PortableText"

import { QUERIES } from "../constants"
import Spacer from "../components/Spacer"
import HeroButtonGroup from "../components/HeroButtonGroup"
import RecentProjectList from "../components/RecentProjectList"

export default function HomePage({ data }) {
  const intl = useIntl()
  if (!data) return

  const { pageData } = data
  const homePageCopy = pageData.content

  return (
    <>
      <SEO title={`Home`} lang={intl.locale}></SEO>
      <MainLayout>
        <PageWrapper>
          <FlexWrapper>
            {/* Hero */}
            <HeroWrapper>
              {/* Mobile Pic */}
              <MobileImgWrapper>
                <AboutImg
                  image={pageData?.openGraphImage?.asset.gatsbyImageData}
                  alt="A photo of Matt Oliver, developer, product manager and engineer based in Austin, TX."
                />
              </MobileImgWrapper>
              <PageHero>
                Hi, I'm Matt. <WavingHand />
              </PageHero>
              {homePageCopy.map(item => {
                if (item.heading === "Hero Copy Subhead")
                  return (
                    <React.Fragment key={item._key}>
                      <HeroCopyWrapper>
                        <HeroCopySubHead>
                          {item.text && <PortableText blocks={item.text} />}
                          {` `}
                        </HeroCopySubHead>
                      </HeroCopyWrapper>
                    </React.Fragment>
                  )
              })}
              <Spacer axis="vertical" size={40} />
            </HeroWrapper>
            {/* Pic */}
            <ImgWrapper>
              <AboutImg
                image={pageData?.openGraphImage?.asset.gatsbyImageData}
                alt="A photo of Matt Oliver, artist and engineer based in Austin, TX."
              />
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
    pageData: sanityPage(title: { eq: "Home" }) {
      id
      openGraphImage {
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
  @media ${QUERIES.tabletAndUp} {
    flex-direction: row;
  }
`
const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  @media ${QUERIES.tabletAndUp} {
    display: revert;
    padding: 0 1.75rem;
  }
`
const HeroCopyWrapper = styled.div`
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
`

const HeroCopySubHead = styled.h2`
  color: var(--color-textPrimary);
  margin-top: 1rem;
  line-height: clamp(1.5rem, 2vw + 1.25rem, 2.5rem);
  font-size: clamp(1.5rem, 2vw + 1.25rem, 2.5rem);
  width: clamp(500px, 95%, 800px);
  max-width: 100%;
  /* font-family: system-ui; */
  font-variation-settings: "wght" 400;
  font-weight: medium;
  a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
  @media ${QUERIES.tabletAndUp} {
    font-variation-settings: "wght" 400;
    font-weight: bold;
  }
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
`

const HeroCopyText = styled.p`
  color: var(--color-textPrimary);
  margin-top: 2.75rem;
  padding: 0 1rem;
  line-height: clamp(1.5rem, /* 1.3vw + .9rem, */ 1.75vw + 0.5rem, 1.95rem);
  font-size: clamp(1.5rem, /* 1.3vw + .9rem, */ 1.75vw + 0.5rem, 1.95rem);
  a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
  width: clamp(300px, 95%, 750px);
  @media ${QUERIES.tabletAndUp} {
    padding: 0 1.5rem;
  }
`

const MobileImgWrapper = styled.div`
  width: 100px;
  height: 100px;
  justify-self: center;
  align-self: center;
  margin-top: 1.5rem;
  border-radius: 50%;
  background: transparent;
  @media ${QUERIES.tabletAndUp} {
    display: none;
  }
`

const ImgWrapper = styled.div`
  display: none;
  @media ${QUERIES.tabletAndUp} {
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
