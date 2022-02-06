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
      return Story()
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
  },
}

export const pageHero = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <PageHero {...args} />
    </ThemeProvider>
  )
}

pageHero.args = {
  heading: "Hi, I'm Matt.",
  subheading: "I'm an artist, musician, and inter-disciplinary engineer.",
}
