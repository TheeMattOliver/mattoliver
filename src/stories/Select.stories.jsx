import React from "react"
import GlobalStyles from "../components/GlobalStyles"

import { ThemeProvider } from "../components/ThemeProvider"
import Select from "../components/Select"
export default {
  title: "Components/Select",
  component: Select,
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
  argTypes: {},
}

const items = ["Item 1", "Item 2", "Item 3"]

export const select = args => {
  return (
    <Select>
      {items.map(item => {
        return <option key={item}>{item}</option>
      })}
    </Select>
  )
}
