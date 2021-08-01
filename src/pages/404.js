import React from "react"
import { FormattedMessage, injectIntl } from "gatsby-plugin-intl"

import MainLayout from "../components/MainLayout"
import SEO from "../components/SEO"

const NotFoundPage = ({ intl }) => {
  return (
    <>
      <MainLayout>
        <SEO
          lang={intl.locale}
          title={`404: ${intl.formatMessage({ id: "title" })}`}
        />
        <h1>
          <FormattedMessage id="notfound.header" />
        </h1>
        <p>
          <FormattedMessage id="notfound.description" />
        </p>
      </MainLayout>
    </>
  )
}

export default injectIntl(NotFoundPage)
