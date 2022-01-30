/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby-plugin-react-intl"

import { COLORS, QUERIES, FONT_WEIGHTS } from "../../constants"
import { throttle } from "../../lib/utils"
import DarkToggleIcon from "../DarkToggleIcon"
import MobileMenu from "../MobileMenu"
import VisuallyHidden from "../VisuallyHidden"
import Icon from "../Icon"
import UnstyledButton from "../UnstyledButton"

const HEADER_HIDE_THRESHOLD = 400
// How this works:
// 1. Track the scroll position
// 2. See what it was last time
// 3. Compare it to now
// 4. Do something based on that

const MagicHeader = siteTitle => {
  const { title } = siteTitle
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)

  useEffect(() => {
    // to know which direction the user is scrolling
    // keep track of whatever the value was in the previous iteration
    let previousScrollValue

    // don’t allow handleScroll to execute more than once every 350 ms
    const handleScroll = throttle(event => {
      const currentScroll = window.scrollY
      // console.log({ currentScroll })

      // if I have not yet scrolled, save this current value and
      // the next time I scroll, where I am now will be the previous scroll
      if (typeof previousScrollValue !== "number") {
        previousScrollValue = currentScroll
        return
      }
      // console.log({ previousScrollValue }, { currentScroll })
      // console.log({ isHeaderVisible })

      // determine scroll direction
      const direction = currentScroll > previousScrollValue ? "down" : "up"

      // hide the header if we're scrolling down
      // get below a certain point and hide the header
      if (
        isHeaderVisible &&
        direction === "down" &&
        currentScroll > HEADER_HIDE_THRESHOLD
      ) {
        setIsHeaderVisible(false)
        // else show the header
      } else if (!isHeaderVisible && direction === "up") {
        setIsHeaderVisible(true)
      }

      // whether we have a previous value or not, last thing to do
      // is update the scroll value
      previousScrollValue = currentScroll
    }, 350)

    window.addEventListener("scroll", handleScroll)
    // clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isHeaderVisible])

  const transform = isHeaderVisible ? "translateY(0%)" : "translateY(-100%)"

  return (
    <>
      <NavWrapper
        style={{ transform }}
        className={`justify-between px-6 md:px-8 py-8 space-x-10 items-baseline shadow-sm`}
      >
        <Logo to="/">
          <VisuallyHidden>Return to home page</VisuallyHidden>
          {title}
        </Logo>

        <DesktopNav>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/work">Work</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <DarkToggleIcon />
        </DesktopNav>
        <MobileActions>
          <UnstyledButton onClick={() => setShowMobileMenu(true)}>
            <Icon
              id="menu"
              strokeWidth={2}
              size={24}
              color={COLORS.gray900}
              width={24}
              className="-mb-1"
            />
            <VisuallyHidden>Menu</VisuallyHidden>
          </UnstyledButton>
          <DarkToggleIcon />
        </MobileActions>

        <MobileMenu
          isOpen={showMobileMenu}
          onDismiss={() => setShowMobileMenu(false)}
        />
      </NavWrapper>
    </>
  )
}

const HeaderSpacer = styled.div`
  min-width: ${p => p.size}px;
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  margin-right: auto;
`

const DesktopNav = styled.nav`
  display: none;

  @media ${QUERIES.laptopAndUp} {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    gap: clamp(1rem, 9.2vw - 4.5rem, 3.5rem);
    /* No Flexbox gap on Safari 
		display: flex;
		gap: clamp(1rem, 9.2vw - 4.5rem, 3.5rem); */
    margin: 0px 48px;
    /* margin-left:auto; */
  }
`

const NavLink = styled(Link)`
  font-size: 1.125rem;
  text-decoration: none;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    display: block;
    width: 99%;
    height: 1px;
    bottom: -0.43rem;
    left: 0;
    background-color: var(--color-textPrimary);
    transform: scaleX(0);
    transform-origin: top left;
    transition: transform 0.3s ease;
  }
  &:hover::before {
    transform: scaleX(1);
  }
  &:not(:last-of-type) {
    margin-left: 16px;
  }
  &.active {
    text-decoration: underline;
    text-underline-offset: 0.45rem;
    pointer-events: none;
  }
  &[aria-current="page"] {
    text-decoration: underline;
    text-underline-offset: 0.45rem;
    transform: 0;
    pointer-events: none;
  }
`

const NavWrapper = styled.header`
  a,
  div {
    color: var(--color-textPrimary);
  }
  display: flex;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-borderPrimary);
  position: sticky;
  top: 0;
  transition: transform 250ms;
  z-index: 1;
`

const MobileActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 16px;
  /* no Safari flexbox gap support
	gap: 16px;
	display: flex;
	align-items: center;
	 */
  @media ${QUERIES.tabletAndUp} {
    gap: 32px;
  }
  @media ${QUERIES.laptopAndUp} {
    display: none;
  }
`

MagicHeader.propTypes = {
  siteTitle: PropTypes.string,
}

MagicHeader.defaultProps = {
  siteTitle: ``,
}

export default MagicHeader
