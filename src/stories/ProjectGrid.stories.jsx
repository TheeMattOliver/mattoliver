import React from "react"
import GlobalStyles from "../components/GlobalStyles"
import ProjectGrid from "../components/ProjectGrid"
import { ThemeProvider } from "../components/ThemeProvider"

export default {
  title: "Components",
  component: ProjectGrid,
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

const items = [
  {
    id: "1",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
  {
    id: "2",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
  {
    id: "3",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
  {
    id: "4",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
  {
    id: "5",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
  {
    id: "6",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
  {
    id: "7",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
  {
    id: "8",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
  {
    id: "9",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
  {
    id: "10",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
  {
    id: "11",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
  {
    id: "12",
    href: "https://www.google.com",
    title: "This title is a link",
    imgUrl: "https://loremflickr.com/640/360",
  },
]

projectGrid.args = {
  data: items,
}
