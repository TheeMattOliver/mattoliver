import React from "react"
import ProjectCard from "../components/ProjectCard"

export default {
  title: "Components",
  component: ProjectCard,
  decorators: [
    Story => {
      // Since portal roots are registered globally, we need this line so that each storybook
      // story works on its own.
      return Story()
    },
  ],
  argTypes: {},
}

export const projectCard = args => {
  return <ProjectCard {...args} />
}

projectCard.args = {}
