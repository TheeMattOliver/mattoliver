import React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

import { PageHeroTitle, HeroCopySubheading } from "."
import WavingHand from "../WavingHand"

import Spacer from "../Spacer"

import { QUERIES } from "../../constants"

const PageHero = ({ heading, subheading, ...props }) => {
  const { cmsPageData } = props.data || {}
  const homePageCMSCopy = cmsPageData?.content

  const imgUrl = cmsPageData?.openGraphImage?.asset.gatsbyImageData
  const imgAltText = cmsPageData?.openGraphImage?.alt

  return (
    <HeroWrapper>
      {/* Mobile Pic */}
      <MobileImgWrapper>
        <AvatarImg image={imgUrl} alt={imgAltText} />
      </MobileImgWrapper>
      <PageHeroTitle>
        {heading} <WavingHand />
      </PageHeroTitle>

      {subheading && (
        <PageHeroCopyWrapper>
          <HeroCopySubheading>
            {subheading}
            {` `}
          </HeroCopySubheading>
        </PageHeroCopyWrapper>
      )}
      <Spacer axis="vertical" size={40} />
    </HeroWrapper>
  )
}

const HeroWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  @media ${QUERIES.smAndUp} {
    display: revert;
    padding: 0 1.75rem;
  }
`
const PageHeroCopyWrapper = styled.div`
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

const AvatarImg = styled(GatsbyImage)`
  border-radius: 50%;
  filter: drop-shadow(0px 0px 25px hsl(0deg 0% 0% / 0.3));
  img {
    border-radius: 50%;
    /* filter: drop-shadow(0px 0px 25px hsl(0deg 0% 0% / 0.3)); */
  }
`
export default PageHero
