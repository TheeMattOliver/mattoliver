import React from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

import { PageHeroTitle, HeroCopySubheading } from "."
import WavingHand from "../WavingHand"
// import PortableText from "../PortableText"
import Spacer from "../Spacer"

import { QUERIES } from "../../constants"

export const PageHero = ({ heading, subheading, ...props }) => {
  const { cmsPageData } = props.data || {}
  const homePageCMSCopy = cmsPageData?.content
  // const imgUrl = pageData?.openGraphImage?.asset.gatsbyImageData
  let imgUrl =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  const imgAltText = pageData?.openGraphImage?.alt

  return (
    <HeroWrapper>
      {/* Mobile Pic */}
      <MobileImgWrapper>
        <AboutImg image={imgUrl} alt={imgAltText} />
      </MobileImgWrapper>
      <PageHeroTitle>
        {heading} <WavingHand />
      </PageHeroTitle>
      {/* are we getting our copy from CMS? */}
      {/* {homePageCMSCopy &&
        homePageCMSCopy.map(cmsItem => {
          // sanity has a "heading", which we confusingly want to be
          // the subheading text
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
        })} */}
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

const AboutImg = styled(GatsbyImage)`
  border-radius: 50%;
  filter: drop-shadow(0px 0px 25px hsl(0deg 0% 0% / 0.3));
  img {
    border-radius: 50%;
    /* filter: drop-shadow(0px 0px 25px hsl(0deg 0% 0% / 0.3)); */
  }
`
