import React from "react"

import { ThemeProvider } from "../ThemeContext"
import GlobalStyle from "../GlobalStyle"

function App({ children }) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

export default App
