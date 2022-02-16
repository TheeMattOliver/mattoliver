import React from "react"

import { ThemeProvider } from "../ThemeProvider"
import GlobalStyles from "../GlobalStyles"

import { space, primary, spooky, tufte } from "../../theme"

const themeMap = {
  space: space,
  primary: primary,
  spooky: spooky,
  tufte: tufte,
}

function App({ children }) {
  const [theme, setTheme] = React.useState("primary")

  return (
    <ThemeProvider theme={themeMap[theme]}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default App
