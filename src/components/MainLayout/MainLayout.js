/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { injectIntl } from "gatsby-plugin-react-intl"
import styled from "styled-components"
import { motion } from "framer-motion"

import MagicHeader from "../MagicHeader"
import Footer from "../Footer"
import { QUERIES, TRANSITIONS } from "../../constants"

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
        <MagicHeader title={data.site.siteMetadata.title} />
        <Middle>
          <MotionMain
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
              ease: [0.17, 0.67, 0.83, 0.67],
            }}
          >
            {children}
          </MotionMain>
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
  header,
  main,
  footer {
    flex-shrink: 0;
  }
`
const Middle = styled.section`
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
`
const Main = styled.main`
  background-color: var(--color-background);
  display: flex;
  flex: 1;
  width: 100%;
  @media ${QUERIES.tabletAndUp} {
    flex: 1;
  }
`
const MotionMain = styled(motion.main)`
  background-color: var(--color-background);
  display: flex;
  flex: 1;
  width: 100%;
  @media ${QUERIES.tabletAndUp} {
    flex: 1;
  }
`

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
