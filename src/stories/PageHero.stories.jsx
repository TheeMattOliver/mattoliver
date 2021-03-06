import React from "react"
import GlobalStyles from "../components/GlobalStyles"
import { ThemeProvider } from "../components/ThemeProvider"

import { PageHero } from "../components/PageHero"
export default {
  title: "Components/Page Hero",
  component: PageHero,
  decorators: [
    Story => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works on its own.
      return (
        <ThemeProvider>
          <GlobalStyles />
          {Story()}
        </ThemeProvider>
      )
    },
  ],
  argTypes: {
    heading: {
      control: {
        type: "text",
      },
    },
    subheading: {
      control: {
        type: "text",
      },
    },
    hasEmoji: {
      options: [true, false],
      control: {
        type: "radio",
      },
    },
  },
}

export const composedPageHero = args => {
  return <PageHero {...args} />
}

composedPageHero.args = {
  heading: "Hi, I'm Matt.",
  subheading: "I'm an artist, musician, and inter-disciplinary engineer.",
  hasEmoji: true,
}
