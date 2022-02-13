import React, { useState } from "react"
import styled from "styled-components"
import { GatsbyImage } from "gatsby-plugin-image"

import { PageTitle, HeroSubheading, HeroCopyText } from "."

import { FancyEmoji } from "../FancyEmoji"

import Spacer from "../Spacer"
import PortableText from "../PortableText"
import { Button } from "../Button"

import { QUERIES } from "../../constants"
import { creepy, space, primary } from "../../theme"

const themeMap = {
  space: space,
  primary: primary,
  creepy: creepy,
}

const PageHero = ({ heading, subheading, cmsData, hasEmoji, ...props }) => {
  const [theme, setTheme] = useState("primary")
  console.log("theme: ", theme)
  return (
    <HeroWrapper>
      {hasEmoji ? (
        <PageTitle>
          {heading} <FancyEmoji emoji={themeMap[theme].emoji} />
        </PageTitle>
      ) : (
        <PageTitle>{heading}</PageTitle>
      )}
      <div style={{ display: "flex" }}>
        <Button
          variant="invisible"
          size="large"
          onClick={() => setTheme("creepy")}
        >
          Spooky
        </Button>
        <Button
          variant="invisible"
          size="large"
          onClick={() => setTheme("space")}
        >
          Space
        </Button>
        <Button
          variant="invisible"
          size="large"
          onClick={() => setTheme("primary")}
        >
          Normal
        </Button>
      </div>

      {!cmsData && (
        <PageHeroCopyWrapper>
          <HeroSubheading>
            {subheading}
            {` `}
          </HeroSubheading>
        </PageHeroCopyWrapper>
      )}
      {/* are we getting our copy from CMS? */}
      {cmsData &&
        cmsData.map(cmsItem => {
          // sanity has a "heading", which we confusingly assign to  subheading text
          if (cmsItem.heading === "Hero Copy Subheading") {
            return (
              <React.Fragment key={cmsItem._key}>
                <PageHeroCopyWrapper>
                  <HeroSubheading>
                    {cmsItem.text && <PortableText blocks={cmsItem.text} />}
                    {` `}
                  </HeroSubheading>
                </PageHeroCopyWrapper>
              </React.Fragment>
            )
          } else if (cmsItem.heading === "Hero Copy Text") {
            return (
              <React.Fragment key={cmsItem._key}>
                <PageHeroCopyWrapper>
                  <HeroCopyText>
                    {cmsItem.text && <PortableText blocks={cmsItem.text} />}
                    {` `}
                  </HeroCopyText>
                </PageHeroCopyWrapper>
              </React.Fragment>
            )
          }
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
