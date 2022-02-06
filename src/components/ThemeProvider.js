import React from "react"
import { ThemeProvider as SCThemeProvider } from "styled-components"

import {
  COLORS,
  COLOR_MODE_KEY,
  INITIAL_COLOR_MODE_CSS_PROP,
} from "../constants"

const defaultColorMode = "light"

export const ThemeContext = React.createContext()

export const ThemeProvider = ({ children, ...props }) => {
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
      colorMode,
      setColorMode,
    }
  }, [colorMode, rawSetColorMode])

  console.log("contextValue: ", contextValue)
  return (
    <ThemeContext.Provider value={contextValue}>
      <SCThemeProvider theme={contextValue}>{children}</SCThemeProvider>{" "}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return React.useContext(ThemeContext)
}
