import React from "react"
import "./styles.css"
import styled, { createGlobalStyle } from "styled-components"

import { action } from "@storybook/addon-actions"
import { addons } from "@storybook/addons"
import { addDecorator } from "@storybook/react"
import { withPerformance } from "storybook-addon-performance"

import { ThemeProvider, ThemeContext } from "../src/components/ThemeProvider"

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = "/"
// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

addDecorator(withPerformance)

// set global theme styles for each story
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
  }
  body {
    //CSS reset
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    // temporary theme values
    background-color: var(--color-background);
    color: var(--color-text)
  }
  input, button, textarea, select {
    font: inherit;
  }
`
// only remove padding for multi-theme view grid
const GlobalStyleMultiTheme = createGlobalStyle`
  body {
    padding: 0 !important;
  }
`

// duo theme view, this can be extended for more themes
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100vh;
  /* height: 100%; */
`

// instead of global theme, only theme wrapper for each story
const ThemedSectionStyle = styled.div`
  background-color: var(--color-background);
  color: var(--color-text)
  padding: 1rem;
`
export const globalTypes = {
  colorMode: {
    name: "Color mode",
    description: "Color mode (light, dark, auto, all)",
    defaultValue: "light",
    toolbar: {
      icon: "circle",
      // array of colorMode items
      items: ["light", "dark", "auto", "all"],
      showName: true,
    },
  },
}
const withThemeProvider = (Story, context) => {
  console.log("context.globals.colorMode: ", context.globals.colorMode)

  if (context.globals.colorMode === "all") {
    return (
      <Wrapper>
        <GlobalStyleMultiTheme />
        <ThemeProvider colorMode="light">
          <ThemedSectionStyle>
            <Story {...context} />
          </ThemedSectionStyle>
        </ThemeProvider>
        <ThemeProvider colorMode="dark">
          <ThemedSectionStyle>
            <Story {...context} />
          </ThemedSectionStyle>
        </ThemeProvider>
      </Wrapper>
    )
  }

  return (
    <ThemeProvider colorMode={context.globals.colorMode}>
      <GlobalStyle />
      <Story {...context} />
    </ThemeProvider>
  )
}
export const decorators = [withThemeProvider, withPerformance]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
