import React from "react"
import { injectIntl } from "gatsby-plugin-react-intl"
import SEO from "./SEO"

const Redirect = ({ intl }) => {
  return <SEO title={`${intl.formatMessage({ id: "title" })}`} />
}

export default injectIntl(Redirect)
