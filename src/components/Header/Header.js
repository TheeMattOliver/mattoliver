/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby-plugin-intl"

import { COLORS, QUERIES, WEIGHTS } from '../../constants';
import debounce from '../../lib/utils'
import DarkToggleIcon from "../DarkToggleIcon"
import MobileMenu from "../MobileMenu";
import VisuallyHidden from "../VisuallyHidden";
import Icon from "../Icon";
import UnstyledButton from "../UnstyledButton";

const Header = (siteTitle) => {
  const { title } = siteTitle
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <NavWrapper className={`justify-between px-6 py-8 space-x-10 items-baseline shadow-sm`}>
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
              className="-mb-1" />
            <VisuallyHidden>
              Menu
            </VisuallyHidden>
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
`;

const NavWrapper = styled.header`
	a, div {
		color: var(--color-textPrimary);
	}
	display: flex;
	background: var(--color-background);
	border-bottom: 1px solid var(--color-borderPrimary);
	position: sticky;
	top: 0;
	transition: transform 250ms;
	z-index: 1;
  scroll-margin-top: 72px;
`;

const Logo = styled(Link)`
	font-size: 1.5rem;
	margin-right: auto;
`;

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
`;

const NavLink = styled(Link)`
  font-size: 1.125rem;
  text-decoration: none;
  &:not(:last-of-type) {
    margin-left: 1rem;
  }
  &.active {
		text-decoration: underline;
		text-underline-offset: .45rem;
	};
  &[aria-current='page'] {
  	text-decoration: underline;
		text-underline-offset: .45rem;
  }
`;

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
`;

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header