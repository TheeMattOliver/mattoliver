/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { graphql } from 'gatsby'
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image";

import MainLayout from "../components/MainLayout";
import PageHero from "../components/PageHero";
import WavingHand from "../components/WavingHand";
import SEO from "../components/SEO";
import Spacer from "../components/Spacer";
import { QUERIES } from "../constants";

import img from "../assets/images/matt.jpg"
import HeroButtonGroup from "../components/HeroButtonGroup";
import SecondaryHeroBtnLink from "../components/HeroButtonGroup/SecondaryHeroBtnLink";

// const homeHeadline = 'Product-focused, creative engineer on a mission.'
// const copyText = 'My focus is building political tech to power progressive social causes. Always interested in collaborating with teams of misfits, outcasts, and hell-raisers who want to create positive change and challenge the status quo.'

export default function AboutPage({ data }) {
  const intl = useIntl();

  const { pageData } = data

  return (
    <>
      <SEO
        title={`About`}
        lang={intl.locale}
      >
      </SEO>
      <MainLayout>
        <PageWrapper>


          <FlexWrapper>
            {/* Hero */}
            <HeroWrapper>
              {/* Pic */}
              <MobileImgWrapper>
                <AboutImg
                  image={pageData?.content[0]?.image.asset.gatsbyImageData}
                  alt="A photo of Matt Oliver, developer, product manager and engineer based in Austin, TX." />
              </MobileImgWrapper>
              <PageHero>
                Hi, I'm Matt. <WavingHand />
              </PageHero>

              <HeroCopyWrapper>
                <HeroCopySubHead>
                  I'm a developer and currently a senior product manager at <a href="https://civitech.io/voter-registration/">Civitech</a>, building tools to power progressive social causes.{` `}
                </HeroCopySubHead>
              </HeroCopyWrapper>
              <HeroCopyText>
                I'm always interested in working with misfits, outcasts, and hell-raisers to create positive change and challenge the status quo.{` `}
              </HeroCopyText>

            </HeroWrapper>
            <Spacer axis='vertical' size={100} />

            {/* Pic */}
            <ImgWrapper>
              <AboutImg
                image={pageData?.content[0]?.image.asset.gatsbyImageData}
                alt="A photo of Matt Oliver, developer, product manager and engineer based in Austin, TX." />
            </ImgWrapper>
          </FlexWrapper>

          {/* Button */}
          <ButtonWrapper>
            <SecondaryHeroBtnLink to='/contact'>Get in touch</SecondaryHeroBtnLink>
          </ButtonWrapper>
        </PageWrapper>
      </MainLayout>
    </>
  );
}

export const query = graphql`
  query AboutPage {
    pageData: sanityPage(title: {eq: "About"}) {
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
`;
const PageWrapper = styled.div`
  
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${QUERIES.tabletAndUp} {
    flex-direction: row;
  }
`;

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media ${QUERIES.tabletAndUp} {
    display: revert;
  }
`;

const HeroCopyWrapper = styled.div`
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
`;

const HeroCopySubHead = styled.h2`
  color: var(--color-textPrimary);
  font-weight: bold;
  padding: 0 1rem;
  margin-top: 1rem;
  line-height: clamp(
    1.5rem,
    2vw + 1.25rem,
    2.5rem
  );
  font-size: clamp(
    1.5rem,
    2vw + 1.25rem,
    2.5rem
  );
  width: clamp(500px, 95%, 800px);
  max-width: 100%;
  /* font-family: system-ui; */
  font-variation-settings: 'wght' 400;
  a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
	@media ${QUERIES.tabletAndUp} {
		padding: 0 1.5rem;
	}
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
`;

const HeroCopyText = styled.p`
  color: var(--color-textPrimary);
	margin-top: 2.75rem;
	padding: 0 1rem;
  line-height: clamp(
    1.5rem,
    /* 1.3vw + .9rem, */
		1.75vw + .5rem,
    1.95rem
  );
  font-size: clamp(
    1.5rem,
    /* 1.3vw + .9rem, */
		1.75vw + .5rem,
    1.95rem
  );
  a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
  width: clamp(300px, 95%, 750px);
	@media ${QUERIES.tabletAndUp} {
		padding: 0 1.5rem;
	}
`;

const MobileImgWrapper = styled.div`
  width: 150px;
  height: 150px;
  justify-self: center;
  align-self: center;
  margin-top: 1.5rem;
  @media ${QUERIES.tabletAndUp} {
    display: none;
  }
`;

const ImgWrapper = styled.div`
  display: none;
  @media ${QUERIES.tabletAndUp} {
    display: block;
    width: 400px;
    height: 400px;
    margin-top: 50px;
    margin-right: 150px;
  }
`;

const AboutImg = styled(GatsbyImage)`
  border-radius: 50%;
`;

const ButtonWrapper = styled.div`
  padding: 0 1rem;
  margin-bottom: 3rem;
  /* flex: 1;
  justify-content: flex-start;
  align-items: stretch;
  display: flex; */
  @media ${QUERIES.tabletAndUp} {
		padding: 0 1.5rem;
    margin-bottom: 1rem;
	}
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
    margin-bottom: 1rem;
  }
`;