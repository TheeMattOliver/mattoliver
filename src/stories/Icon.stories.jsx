import React from "react"
import GlobalStyles from "../components/GlobalStyles"
import { ThemeProvider } from "../components/ThemeProvider"

import { Icon } from "../components/Icon"

const iconList = [
  "search",
  "menu",
  "close",
  "email",
  "phone",
  "chevronDown",
  "user",
]

export default {
  title: "Components/Icon",
  component: Icon,
  decorators: [
    Story => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works on its own.
      return Story()
    },
  ],
  argTypes: {
    id: {
      options: [
        "search",
        "menu",
        "close",
        "email",
        "phone",
        "chevronDown",
        "user",
      ],
      control: {
        type: "select",
      },
    },
    width: {
      options: [8, 16, 24, 36, 48, 56, 72],
      control: {
        type: "select",
      },
    },
  },
}

export const icon = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Icon {...args} />
    </ThemeProvider>
  )
}
icon.args = {
  id: "search",
  color: "#111113",
  strokeWidth: "2px",
  width: 24,
}

export const allIcons = args => {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <div style={{ display: "flex", gap: "32px" }}>
        {iconList.map(icon => {
          return <Icon key={icon} id={icon} {...args} />
        })}
      </div>
    </ThemeProvider>
  )
}
allIcons.args = {
  color: "#111113",
  strokeWidth: "2px",
  width: 24,
}
