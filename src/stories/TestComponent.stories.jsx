import React from "react"

import TestComponent from "../components/TestComponent"
export default {
  title: "Components/TestComponent",
  component: TestComponent,
  decorators: [
    Story => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works on its own.
      return Story()
    },
  ],
  argTypes: {},
}

export const testComponent = args => {
  return (
    <TestComponent className="bg-red-100" {...args}>
      Hello world
    </TestComponent>
  )
}
