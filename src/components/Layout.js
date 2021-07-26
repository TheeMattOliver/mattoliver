import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./Header"
import Footer from "./Footer"

const MainWrap = styled.div`
  background-color: var(--color-background);
`;

const Layout = ({ children }) => {
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
      <Header title={data.site.siteMetadata.title}/>
      <div className="flex flex-col h-screen justify-between">
        <main className="mb-auto">
          <MainWrap>
          {children}
          </MainWrap>
        </main>
      <Footer data={data.site.siteMetadata}/>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
