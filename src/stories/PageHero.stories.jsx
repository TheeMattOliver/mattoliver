import React from "react"
import GlobalStyles from "../components/GlobalStyles"
import { ThemeProvider } from "../components/ThemeProvider"

import {
  HeroCopySubheading,
  HeroTitle,
  HeroCopyText,
} from "../components/PageHero"

export default {
  title: "Components/Page Hero",
  component: HeroTitle,
  decorators: [
    Story => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works on its own.
      return Story()
    },
  ],
  argTypes: {},
}

export const heroTitle = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <HeroTitle {...args} />
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

export const heroCopySubheading = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <HeroCopySubheading {...args} />
    </ThemeProvider>
  )
}

heroTitle.args = { children: "Hello there" }
heroCopyText.args = {
  children:
    "In addition to a background in music, I have experience building large scale data tools that power progressive social causes. I'm currently working as a design systems engineer.",
}
heroCopySubheading.args = {
  children:
    "In addition to a background in music, I have experience building large scale data tools that power progressive social causes. I'm currently working as a design systems engineer.",
}
