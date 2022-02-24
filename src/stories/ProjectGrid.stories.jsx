import React from "react"
import GlobalStyles from "../components/GlobalStyles"
import ProjectGrid from "../components/ProjectGrid"
import { ThemeProvider } from "../components/ThemeProvider"

export default {
  title: "Components",
  component: "Project Grid",
  decorators: [
    Story => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works on its own.
      return Story()
    },
  ],
  argTypes: {},
}

export const projectGrid = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <ProjectGrid {...args} />
    </ThemeProvider>
  )
}

projectGrid.args = {}
