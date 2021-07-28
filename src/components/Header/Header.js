/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby-plugin-intl"
import { COLORS, QUERIES, WEIGHTS } from '../../constants';

import DarkToggleIcon from "../DarkToggleIcon"
import MobileMenu from "../MobileMenu/";
import VisuallyHidden from "../VisuallyHidden";
import Icon from "../Icon";
import UnstyledButton from "../UnstyledButton";

const HEADER_HIDE_THRESHOLD = 400;

const Header = (siteTitle) => {
	const { title } = siteTitle
	const [showMobileMenu, setShowMobileMenu] = useState(false);
	const [isHeaderVisible, setIsHeaderVisible] = useState(true)
	useEffect(() => {
		// to know which direction the user is scrolling
		// keep track of whatever the value was in the previous iteration
		let previousScrollValue;
		function handleScroll(event) {
			const currentScroll = window.scrollY;
			// console.log({ currentScroll })
			if (typeof previousScrollValue !== 'number') {
				previousScrollValue = currentScroll
				return;
			}
			console.log({ previousScrollValue }, { currentScroll })
			console.log({ isHeaderVisible })
			// determine scroll direction
			const direction = currentScroll > previousScrollValue ? 'down' : 'up'
			// hide the header if we're scrolling down
			// get below a certain point and hide the header
			if (isHeaderVisible && direction === 'down' && currentScroll > HEADER_HIDE_THRESHOLD) {
				setIsHeaderVisible(false)
				// else show the header
			} else if (!isHeaderVisible && direction === 'up') {
				setIsHeaderVisible(true)
			}
			// whether we have a previous value or not, last thing to do
			// is update the scroll value
			previousScrollValue = currentScroll
		}
		window.addEventListener('scroll', handleScroll);
		// clean up
		return () => {
			window.removeEventListener('scroll', handleScroll);
		}
	}, [isHeaderVisible])

	const transform = isHeaderVisible ? 'translateY(0%)' : 'translateY(-100%)'

	return (
		<>
			<NavWrapper style={{ transform }} className={`justify-between px-6 py-8 space-x-10 items-baseline shadow-sm`}>
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
`

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
`;

const Logo = styled(Link)`
	font-size: 1.5rem;
	margin-right: auto;
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: clamp(1rem, 9.2vw - 4.5rem, 3.5rem);
  margin: 0px 48px;
	/* margin-left:auto; */
  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 1.125rem;
  text-decoration: none;
`;

const MobileActions = styled.div`
// on desktop, shouldn't be shown
  display: none;
  @media ${QUERIES.tabletAndSmaller} {
    gap: 32px;
    display: flex;
		align-items: center;
  }
  @media ${QUERIES.phoneAndSmaller} {
    gap: 16px;
  }
`

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``
}

export default Header