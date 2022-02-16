import React from "react"
import { ThemeProvider as SCThemeProvider } from "styled-components"

import {
  COLORS,
  COLOR_MODE_KEY,
  INITIAL_COLOR_MODE_CSS_PROP,
} from "../constants"

import { space, primary, spooky, tufte } from "../theme"

const themeMap = {
  space: space,
  primary: primary,
  spooky: spooky,
  tufte: tufte,
}

const defaultTheme = "primary"
const defaultColorMode = "light"

export const ThemeContext = React.createContext({ setTheme: () => null })

export const ThemeProvider = ({ children, ...props }) => {
  const [theme, setTheme] = React.useState(props.theme)

  const [colorMode, rawSetColorMode] = React.useState(undefined)

  React.useEffect(() => {
    const root = window.document.documentElement
    // Because colors matter so much for the initial page view, we're
    // doing a lot of the work in gatsby-ssr. That way it can happen before
    // the React component tree mounts.
    const initialColorValue = root.style.getPropertyValue(
      INITIAL_COLOR_MODE_CSS_PROP
    )

    rawSetColorMode(initialColorValue)
  }, [])

  // Update state if props change
  React.useEffect(() => {
    rawSetColorMode(props.colorMode ?? defaultColorMode)
  }, [props.colorMode])

  const contextValue = React.useMemo(() => {
    function setColorMode(newValue) {
      const root = window.document.documentElement

      localStorage.setItem(COLOR_MODE_KEY, newValue)

      Object.entries(COLORS).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`

        root.style.setProperty(cssVarName, colorByTheme[newValue])
      })

      rawSetColorMode(newValue)
    }

    return {
      theme,
      setTheme,
      colorMode,
      setColorMode,
    }
  }, [colorMode, theme, rawSetColorMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      <SCThemeProvider theme={theme}>{children}</SCThemeProvider>{" "}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return React.useContext(ThemeContext)
}
