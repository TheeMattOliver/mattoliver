import React from "react"
import GlobalStyles from "../components/GlobalStyles"
import { ThemeProvider } from "../components/ThemeProvider"

import { Button } from "../components/Button"
export default {
  title: "Components/Button",
  component: Button,
  decorators: [
    Story => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works on its own.
      return Story()
    },
  ],
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "radio",
      },
    },
    variant: {
      options: ["default", "primary", "secondary", "outline", "invisible"],
      control: {
        type: "select",
      },
    },
  },
}

export const defaultButton = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Button {...args} />
    </ThemeProvider>
  )
}
defaultButton.args = {
  size: "medium",
  children: "Default",
  variant: "default",
}

export const primaryButton = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Button {...args} />
    </ThemeProvider>
  )
}
primaryButton.args = {
  size: "medium",
  children: "Primary",
  variant: "primary",
}

export const outlineButton = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Button {...args} />
    </ThemeProvider>
  )
}
outlineButton.args = {
  size: "medium",
  children: "Outline",
  variant: "outline",
}
export const secondaryButton = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Button {...args} />
    </ThemeProvider>
  )
}
secondaryButton.args = {
  size: "medium",
  children: "Secondary",
  variant: "secondary",
}

export const invisibleButton = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Button {...args} />
    </ThemeProvider>
  )
}
invisibleButton.args = {
  size: "medium",
  children: "Invisible",
  variant: "invisible",
}
