import React from "react"
import GlobalStyles from "../components/GlobalStyles"
import { ThemeProvider } from "../components/ThemeProvider"

import WavingHand from "../components/WavingHand"
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
        options: ["small", "medium", "large"],
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
wavingHand.args = { size: "large" }
