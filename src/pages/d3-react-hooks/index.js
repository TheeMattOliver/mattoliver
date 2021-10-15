/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { GatsbyImage } from "gatsby-plugin-image"

import { BREAKPOINTS, TRANSITIONS } from "../../constants"

import SEO from "../../components/SEO"
import MainLayout from "../../components/MainLayout"
import D3ReactProjectList from "../../components/D3ReactHooks/D3ReactProjectList"
import PageHero from "../../components/PageHero"

export default function D3ReactHooksProjectsHomePage() {
  const intl = useIntl()

  return (
    <>
      <SEO title={`D3 & React hooks`} lang={intl.locale}></SEO>
      <MainLayout>
        <D3ReactProjectList charts={``} />
      </MainLayout>
    </>
  )
}
