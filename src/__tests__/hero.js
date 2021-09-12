import React from "react"
import { render, screen } from "@testing-library/react"

import PageHero from '../components/PageHero'

// You have to write data-testid
const TestTitle = () => <h1 data-testid="test-title">Testing is great!</h1>

test("The dummy test displays the correct title", () => {
  const { getByTestId } = render(<TestTitle />)
  // Assertion
  expect(getByTestId("test-title")).toHaveTextContent("Testing is great!")
  // --> Test will pass
})