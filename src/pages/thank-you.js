/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-react-intl"

import MainLayout from "../components/MainLayout"
import FormSubmitThankYou from "../components/FormSubmitThankYou"
import SEO from "../components/SEO"

import { QUERIES, WEIGHTS } from "../constants"

export default function ContactPage() {
  return (
    <>
      <SEO title={`Thank you`}></SEO>
      <MainLayout></MainLayout>
    </>
  )
}
