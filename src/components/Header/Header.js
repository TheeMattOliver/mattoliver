/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby-plugin-intl"
import { COLORS, QUERIES, WEIGHTS } from '../../constants';

import DarkToggleIcon from "../DarkToggleIcon"
import MobileMenu from "../MobileMenu/";
import VisuallyHidden from "../VisuallyHidden";
import Icon from "../Icon";
import UnstyledButton from "../UnstyledButton";

const Header = (siteTitle) => {
	const { title } = siteTitle
	const [showMobileMenu, setShowMobileMenu] = useState(false);

	return (
		<>
			<NavWrapper className="justify-between px-6 py-8 space-x-10 items-baseline">
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
	siteTitle: ``,
}

export default Header