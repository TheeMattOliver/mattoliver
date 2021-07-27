import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import DarkToggle from './DarkToggle'
import LanguageFlyoutMenu from './LanguageFlyoutMenu'

const Header = (siteTitle) => {
	const { title } = siteTitle
	return (
		<>
			<NavWrapper className="max-w-7xl mx-auto px-4 py-4 space-x-10 items-baseline">
				<Logo>{title}</Logo>
				<LanguageFlyoutMenu />
				<DarkToggle />
			</NavWrapper>
		</>
	)
}

const NavWrapper = styled.header`
	a, div {
		color: var(--color-textPrimary);
	}
	display: flex;
	background: var(--color-background);
`;

const Logo = styled.a`
	font-size: 1.5rem;
	margin-right: auto;
`;

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default Header