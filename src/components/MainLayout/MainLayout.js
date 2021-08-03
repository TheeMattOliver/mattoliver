/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import MagicHeader from "../MagicHeader"
import Footer from "../Footer"
import { QUERIES } from "../../constants"

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]')
}

const MainLayout = ({ children, ...props }) => {
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
        <MagicHeader title={data.site.siteMetadata.title} />
        <Main>
          {children}
        </Main>
        <Footer data={data.site.siteMetadata} />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Main = styled.main`
  background-color: var(--color-background);
  display: flex;
  flex: 1;
`;

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
