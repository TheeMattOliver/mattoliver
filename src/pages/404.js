import React from "react"
import { FormattedMessage, injectIntl } from "gatsby-plugin-react-intl"

import MainLayout from "../components/MainLayout"
import SEO from "../components/SEO"
import PageNotFound from "../components/PageNotFound"

const NotFoundPage = ({ intl }) => {
  return (
    <>
      <MainLayout>
        <SEO
          lang={intl.locale}
          title={`404: ${intl.formatMessage({ id: "title" })}`}
        />
        <PageNotFound />
      </MainLayout>
    </>
  )
}

export default injectIntl(NotFoundPage)
