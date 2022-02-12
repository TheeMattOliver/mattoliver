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
      return (
        <ThemeProvider>
          <GlobalStyles />
          {Story()}
        </ThemeProvider>
      )
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
  return <Button {...args} />
}
defaultButton.args = {
  size: "medium",
  children: "Default",
  variant: "default",
}

export const primaryButton = args => {
  return <Button {...args} />
}
primaryButton.args = {
  size: "medium",
  children: "Primary",
  variant: "primary",
}

export const outlineButton = args => {
  return <Button {...args} />
}
outlineButton.args = {
  size: "medium",
  children: "Outline",
  variant: "outline",
}
export const secondaryButton = args => {
  return <Button {...args} />
}
secondaryButton.args = {
  size: "medium",
  children: "Secondary",
  variant: "secondary",
}

export const invisibleButton = args => {
  return <Button {...args} />
}
invisibleButton.args = {
  size: "medium",
  children: "Invisible",
  variant: "invisible",
}
