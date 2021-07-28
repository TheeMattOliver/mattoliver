import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "../Header"
import Footer from "../Footer"

const Layout = ({ children, ...props }) => {
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
        <Header title={data.site.siteMetadata.title} />
        {/* <div className="flex flex-col justify-between"> */}
        <Middle>
          <Main>
            {children}
          </Main>
        </Middle>
        <Footer data={data.site.siteMetadata} />
        {/* </div> */}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;
const Middle = styled.section`
  flex: 1;
  display: flex;
`;
const Main = styled.main`
  background-color: var(--color-background);
  display: flex;
  flex: 3;
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout