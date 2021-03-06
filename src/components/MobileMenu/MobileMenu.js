/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react"
import styled from "styled-components/macro"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { Link } from "gatsby-plugin-react-intl"
import { AnimatePresence, motion } from "framer-motion"

import { QUERIES, COLORS, WEIGHTS } from "../../constants"

import UnstyledButton from "../UnstyledButton"
import { Icon } from "../Icon"
import VisuallyHidden from "../VisuallyHidden"
import { ThemeContext } from "../ThemeProvider"

const MobileMenu = ({ isOpen, onDismiss }) => {
  const { colorMode, setColorMode } = useContext(ThemeContext)

  const MotionDialogOverlay = motion(Overlay)
  const MotionDialogContent = motion(Content)

  // Close on "Escape"
  useEffect(() => {
    function handleKeydown(ev) {
      if (ev.key === "Escape") {
        onDismiss()
      }
    }

    window.addEventListener("keydown", handleKeydown)

    return () => {
      window.removeEventListener("keydown", handleKeydown)
    }
  })

  return (
    <MotionDialogOverlay
      isOpen={isOpen}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onDismiss={onDismiss}
    >
      <MotionDialogContent
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ min: 0, max: 100, bounceDamping: 9 }}
        aria-label="Mobile menu"
      >
        <CloseButton onClick={onDismiss}>
          <Icon
            id="close"
            strokeWidth={2}
            size={24}
            color={`${
              colorMode === "light" ? COLORS.text.light : COLORS.text.dark
            }`}
            width={24}
          />
          <VisuallyHidden>Close menu</VisuallyHidden>
        </CloseButton>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/work">Work</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </Nav>
        <Filler />
      </MotionDialogContent>
    </MotionDialogOverlay>
  )
}

export default MobileMenu

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsl(220deg 5% 40% / 0.8);
  display: flex;
  justify-content: flex-end;
  z-index: 2;
`

const Content = styled(DialogContent)`
  background: var(--color-background);
  width: 300px;
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  // give it a larger tap target with the padding
  top: 10px;
  right: 0;
  padding: 16px;
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const NavLink = styled(Link)`
  color: var(--color-text);
  text-decoration: none;
  font-size: 2.125rem;

  &:first-of-type {
    color: var(--color-textSecondary);
  }
`

const Filler = styled.div`
  flex: 1;
`
