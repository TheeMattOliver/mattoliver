import React from "react"
import renderer from "react-test-renderer"

import Header from "../components/MagicHeader"

describe("MagicHeader", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<MagicHeader siteTitle="Default Starter" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})