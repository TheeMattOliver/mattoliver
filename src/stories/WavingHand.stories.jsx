import React from "react"
import GlobalStyles from "../components/GlobalStyles"
import { ThemeProvider } from "../components/ThemeProvider"

import WavingHand from "../components/WavingHand"
import FancyEmoji from "../components/WavingHand/FancyEmoji"
export default {
  title: "Components/Page Hero",
  component: WavingHand,
  decorators: [
    Story => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works on its own.
      return Story()
    },
  ],
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["small", "medium", "large", "xl"],
      },
    },
    emoji: {
      control: {
        type: "radio",
        options: ["👋", "👻", "👾"],
      },
    },
  },
}

export const wavingHand = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <WavingHand {...args}></WavingHand>
    </ThemeProvider>
  )
}

export const fancyEmoji = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <FancyEmoji {...args}></FancyEmoji>
    </ThemeProvider>
  )
}
wavingHand.args = { size: "xl" }
fancyEmoji.args = { size: "xl", emoji: "👋" }
