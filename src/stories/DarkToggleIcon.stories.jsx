import React from "react"
import GlobalStyles from "../components/GlobalStyles"
import { ThemeProvider } from "../components/ThemeProvider"

import DarkToggle from "../components/DarkToggle"
export default {
  title: "Components",
  component: DarkToggle,
  decorators: [
    Story => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works on its own.
      return Story()
    },
  ],
  argTypes: {},
}

export const darkToggle = args => {
  return <DarkToggle {...args}></DarkToggle>
}
darkToggle.args = {}
