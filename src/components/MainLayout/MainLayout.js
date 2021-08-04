/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { injectIntl } from "gatsby-plugin-intl"
import styled from "styled-components"

import MagicHeader from "../MagicHeader"
import Footer from "../Footer"
import { QUERIES } from "../../constants"

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

const MainLayout = ({ children, intl, ...props }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          siteUrl
          author
        }
      }
    }
  `)

  return (
    <>
      <Wrapper>
        <MagicHeader title={intl.formatMessage({ id: data.site.siteMetadata.title })} />
        <Middle>
          <Main>
            {children}
          </Main>
        </Middle>
        <Footer data={data.site.siteMetadata} />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  header, main, footer {
    flex-shrink: 0;
  }
`;
const Middle = styled.section`
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
`;
const Main = styled.main`
  background-color: var(--color-background);
  display: flex;
  flex: 1;
  width: 100%;
  @media ${QUERIES.tabletAndUp} {
    flex: 1;
  }
`;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  intl: PropTypes.object.isRequired
}

export default injectIntl(MainLayout)
