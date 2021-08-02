/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "../Header"
import Footer from "../Footer"
import { QUERIES } from "../../constants"

const GridLayout = ({ children, ...props }) => {

  const data = useStaticQuery(graphql`
    query GridLayoutTitleQuery {
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
  display: grid;
`;
const Middle = styled.section`
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
`;
const Main = styled.main`
  background-color: var(--color-background);
  display: grid;
`;

GridLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default GridLayout
