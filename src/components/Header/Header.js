import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"

import DarkToggleIcon from "../DarkToggleIcon"
import LanguageFlyoutMenu from '../LanguageFlyoutMenu'

const Header = (siteTitle) => {
	const { title } = siteTitle
	return (
		<>
			<NavWrapper className="flex space-between px-4 py-4 space-x-10 items-baseline">
				<Logo to="/">
					<span className="sr-only">Return to home page</span>
					{/* {title} */}
					Site title
				</Logo>
				<LanguageFlyoutMenu />
				<DarkToggleIcon />
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
	border-bottom: 1px solid black;
`;

const Logo = styled(Link)`
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