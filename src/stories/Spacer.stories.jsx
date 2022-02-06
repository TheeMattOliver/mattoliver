import React from "react"
import GlobalStyles from "../components/GlobalStyles"
import { ThemeProvider } from "../components/ThemeProvider"

import Spacer from "../components/Spacer"

export default {
  title: "Components/Spacer",
  component: Spacer,
  decorators: [
    Story => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works on its own.
      return Story()
    },
  ],
  argTypes: {},
}

export const spacer = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Spacer {...args} />
    </ThemeProvider>
  )
}

spacer.args = { axis: "vertical", size: 32 }
