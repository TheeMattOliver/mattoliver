import React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

import { PageHeroTitle, HeroCopySubheading } from "."
import WavingHand from "../WavingHand"

import Spacer from "../Spacer"
import PortableText from "../PortableText"

import { QUERIES } from "../../constants"

const PageHero = ({ heading, subheading, cmsData, ...props }) => {
  return (
    <HeroWrapper>
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
      {/* are we getting our copy from CMS? */}
      {cmsData &&
        cmsData.map(cmsItem => {
          // sanity has a "heading", which we confusingly assign to  subheading text
          if (cmsItem.heading === "Hero Copy Subheading")
            return (
              <React.Fragment key={cmsItem._key}>
                <PageHeroCopyWrapper>
                  <HeroCopySubheading>
                    {cmsItem.text && <PortableText blocks={cmsItem.text} />}
                    {` `}
                  </HeroCopySubheading>
                </PageHeroCopyWrapper>
              </React.Fragment>
            )
        })}

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
