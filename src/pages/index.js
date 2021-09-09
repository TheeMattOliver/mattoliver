/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image";

import SEO from "../components/SEO";
import MainLayout from '../components/MainLayout'
import PageHero from "../components/PageHero";
import WavingHand from "../components/WavingHand";

import { QUERIES } from "../constants";
import Spacer from "../components/Spacer";
import HeroButtonGroup from "../components/HeroButtonGroup";
import RecentProjectList from "../components/RecentProjectList";

export default function HomePage({ data }) {
  const intl = useIntl()
  if (!data) return;

  const { pageData } = data

  return (
    <>
      <SEO
        title={`Home`}
        lang={intl.locale}>
      </SEO>
      <MainLayout>
        <PageWrapper>
          <FlexWrapper>
            {/* Hero */}
            <HeroWrapper>
              {/* Mobile Pic */}
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
                  I'm an artist, front-end engineer, product designer, and I currently work as a senior product manager at <a href="https://civitech.io/voter-registration/">Civitech</a>, building tools to power progressive social causes.{` `}                </HeroCopySubHead>
              </HeroCopyWrapper>
              <Spacer axis='vertical' size={40} />
            </HeroWrapper>
            {/* Pic */}
            <ImgWrapper>
              <AboutImg
                image={pageData?.content[0]?.image.asset.gatsbyImageData}
                alt="A photo of Matt Oliver, developer, product manager and engineer based in Austin, TX." />
            </ImgWrapper>
          </FlexWrapper>

          <HeroButtonGroup />
          <Spacer axis='vertical' size={80} />

          {/* Recent projects */}
          <RecentProjectList />

        </PageWrapper>
      </MainLayout>
    </>
  );
}
export const query = graphql`
  query HomePage {
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
  margin-top: 2rem;
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
  font-weight: medium;
  a {
    color: var(--color-textLink);
    text-decoration: underline;
  }
	@media ${QUERIES.tabletAndUp} {
		padding: 0 1.5rem;
    font-variation-settings: 'wght' 400;
    font-weight: bold;
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
  width: 100px;
  height: 100px;
  justify-self: center;
  align-self: center;
  margin-top: 1.5rem;
  border-radius: 50%;
  @media ${QUERIES.tabletAndUp} {
    display: none;
  }
`;

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
`;

const AboutImg = styled(GatsbyImage)`
  border-radius: 50%;
  img {
    border-radius: 50%;
    filter: drop-shadow(0px 0px 25px hsl(0deg 0% 0% / 0.3));
  }
`;


