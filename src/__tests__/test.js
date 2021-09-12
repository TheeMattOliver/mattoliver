import React from "react"
import { render, screen } from "@testing-library/react"

// You have to write data-testid
const TestTitle = () => <h1 data-testid="test-title">Testing is great!</h1>

test("Displays the correct title", () => {
  const { getByTestId } = render(<TestTitle />)
  // Assertion
  expect(getByTestId("test-title")).toHaveTextContent("Gatsby is awesome!")
  // --> Test will pass
})