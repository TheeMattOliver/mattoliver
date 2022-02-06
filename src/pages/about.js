/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-react-intl"
import { GatsbyImage } from "gatsby-plugin-image"

import MainLayout from "../components/MainLayout"
import { PageHero } from "../components/PageHero"
import SEO from "../components/SEO"
import Spacer from "../components/Spacer"
import { QUERIES } from "../constants"

import PrimaryHeroBtnLink from "../components/HeroButtonGroup/PrimaryHeroBtnLink"

export default function AboutPage({ data }) {
  const intl = useIntl()

  const { cmsPageData } = data
  const cmsAboutPageCopy = cmsPageData.content
  const imgUrl = cmsPageData.openGraphImage?.asset.gatsbyImageData
  const imgAltText = cmsPageData.openGraphImage?.alt

  // this is terrible:
  cmsPageData &&
    cmsPageData.content[0].text.map(i => {
      i.markDefs = []
      return i
    })
  cmsPageData &&
    cmsPageData.content[1].text.map(i => {
      i.markDefs = []
      return i
    })

  return (
    <>
      <SEO title={`About`} lang={intl.locale}></SEO>
      <MainLayout>
        <PageWrapper>
          <FlexWrapper>
            {/* Pic */}
            <MobileImgWrapper>
              <AboutImg image={imgUrl} alt={imgAltText} />
            </MobileImgWrapper>
            {/* Hero */}

            <PageHero
              heading={"A quick summary"}
              hasEmoji={false}
              cmsData={cmsAboutPageCopy}
            />

            <Spacer axis="vertical" size={100} />

            {/* Pic */}
            <ImgWrapper>
              <AboutImg
                image={cmsPageData?.content[0]?.image.asset.gatsbyImageData}
                alt={imgAltText}
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
    cmsPageData: sanityPage(title: { eq: "About" }) {
      id
      openGraphImage {
        alt
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
    width: 400px;
    height: 400px;
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
