/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-react-intl"
import { GatsbyImage } from "gatsby-plugin-image"

import MainLayout from "../components/MainLayout"
import PageHero from "../components/PageHero"
import PortableText from "../components/PortableText"
import SEO from "../components/SEO"
import Spacer from "../components/Spacer"
import { QUERIES } from "../constants"

import PrimaryHeroBtnLink from "../components/HeroButtonGroup/PrimaryHeroBtnLink"

export default function AboutPage({ data }) {
  const intl = useIntl()

  const { pageData } = data
  const aboutPageCopy = pageData.content

  // this is terrible:
  pageData &&
    pageData.content[0].text.map(i => {
      i.markDefs = []
      return i
    })

  return (
    <>
      <SEO title={`About`} lang={intl.locale}></SEO>
      <MainLayout>
        <PageWrapper>
          <FlexWrapper>
            {/* Hero */}
            <HeroWrapper>
              {/* Pic */}
              <MobileImgWrapper>
                <AboutImg
                  image={pageData?.content[0]?.image.asset.gatsbyImageData}
                  alt="A photo of Matt Oliver, developer, product manager and engineer based in Austin, TX."
                />
              </MobileImgWrapper>
              <PageTitle>
                <PageHero>A quick summary</PageHero>
              </PageTitle>

              {aboutPageCopy.map(item => {
                return (
                  <HeroCopyText>
                    {item.text && <PortableText blocks={item.text} />}
                  </HeroCopyText>
                )
              })}
            </HeroWrapper>
            <Spacer axis="vertical" size={100} />

            {/* Pic */}
            <ImgWrapper>
              <AboutImg
                image={pageData?.content[0]?.image.asset.gatsbyImageData}
                alt="A photo of Matt Oliver, developer, product manager and engineer based in Austin, TX."
              />
            </ImgWrapper>
          </FlexWrapper>
          <Spacer axis="vertical" size={40} />

          {/* Button */}
          <ButtonWrapper>
            <ButtonContainer>
              <PrimaryHeroBtnLink to="/contact">
                Get in touch
              </PrimaryHeroBtnLink>
            </ButtonContainer>
          </ButtonWrapper>
          <Spacer axis="vertical" size={100} />
        </PageWrapper>
      </MainLayout>
    </>
  )
}

export const query = graphql`
  query AboutPage {
    pageData: sanityPage(title: { eq: "About" }) {
      id
      openGraphImage {
        asset {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
          title
        }
      }
      content {
        ... on SanityImageSection {
          _key
          _type
          _rawText
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
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
`

const PageTitle = styled.div`
  padding: 1rem;
  @media ${QUERIES.smAndUp} {
    padding: 0 2rem;
  }
`

const PageWrapper = styled.div``

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${QUERIES.smAndUp} {
    flex-direction: row;
  }
`

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${QUERIES.smAndUp} {
    display: revert;
  }
`

const HeroCopyWrapper = styled.div`
  @media ${QUERIES.lgAndUp} {
    max-width: 80rem;
  }
`

const HeroCopySubHead = styled.h2`
  color: var(--color-textPrimary);
  padding: 0 1rem;
  margin-top: 16px;
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
  @media ${QUERIES.smAndUp} {
    padding: 0 1.5rem;
    font-variation-settings: "wght" 400;
    font-weight: bold;
  }
  @media ${QUERIES.lgAndUp} {
    max-width: 80rem;
  }
`

const HeroCopyText = styled.p`
  color: var(--color-textPrimary);
  margin-top: 2.75rem;
  padding: 0 1rem;
  line-height: clamp(2.15rem, /* 1.3vw + .9rem, */ 1.75vw + 0.5rem, 1.95rem);
  font-size: clamp(1.5rem, /* 1.3vw + .9rem, */ 1.75vw + 0.5rem, 1.95rem);
  a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
  width: clamp(300px, 95%, 750px);
  @media ${QUERIES.smAndUp} {
    padding: 0 2rem;
  }
`

const Section = styled.section``

const MobileImgWrapper = styled.div`
  width: 150px;
  height: 150px;
  justify-self: center;
  align-self: center;
  margin-top: 24px;
  border-radius: 50%;
  @media ${QUERIES.smAndUp} {
    display: none;
  }
`

const ImgWrapper = styled.div`
  display: none;
  @media ${QUERIES.smAndUp} {
    display: block;
    position: relative;
    /* width: 400px;
    height: 400px; */
    margin-top: 50px;
    margin-right: 150px;
  }
`

const Gradient = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: linear-gradient(deeppink, red, coral, gold, white);
`

const Blurry = styled(Gradient)`
  inset: 0;
  position: absolute;
  filter: blur(40px);
  transform: scale(1.3) translateX(8%) translateY(20%) rotate(30deg);
`

const Regular = styled(Gradient)`
  filter: drop-shadow(0px 0px 25px hsl(0deg 0% 0% / 0.3));
`

const AboutImg = styled(GatsbyImage)`
  border-radius: 50%;
  position: relative;
  filter: drop-shadow(0px 0px 25px hsl(0deg 0% 0% / 0.3));
  img {
    border-radius: 50%;
  }
`

const ButtonWrapper = styled.div`
  padding: 0 1rem;
  margin-top: 16px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
  display: flex;
  @media ${QUERIES.smAndUp} {
    padding: 0 1.5rem;
  }
  @media ${QUERIES.lgAndUp} {
    /* max-width: 80rem; */
  }
  @media ${QUERIES.xlAndUp} {
    /* max-width: revert; */
  }
`

const ButtonContainer = styled.div`
  flex: 1;
  justify-content: flex-start;
  align-items: stretch;
  display: flex;
  @media ${QUERIES.smAndUp} {
    flex: 0;
  }
`
