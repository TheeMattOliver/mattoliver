import React from "react"
import GlobalStyles from "../components/GlobalStyles"
import { ThemeProvider } from "../components/ThemeProvider"

import {
  HeroSubheading,
  PageTitle,
  HeroTitleText,
  HeroCopyText,
} from "../components/PageHero"

export default {
  title: "Components/Page Hero",
  component: PageTitle,
  decorators: [
    Story => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works on its own.
      return Story()
    },
  ],
  argTypes: {},
}

export const pageTitle = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <HeroTitleText {...args} />
    </ThemeProvider>
  )
}
export const heroSubheading = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <HeroSubheading {...args} />
    </ThemeProvider>
  )
}
export const heroCopyText = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <HeroCopyText {...args} />
    </ThemeProvider>
  )
}

pageTitle.args = { children: "Hello there, friend." }
heroCopyText.args = {
  children:
    "I have a very wide variety of creative and technical experience. In addition to a background in music performance and production, I have experience building large-scale data tools that power progressive social causes. I'm currently working as a design systems engineer.",
}
heroSubheading.args = {
  children:
    "I'm Matt. I'm an artist, musician, and inter-disciplinary engineer.",
}
