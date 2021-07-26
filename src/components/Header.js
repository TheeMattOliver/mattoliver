import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import DarkToggle from './DarkToggle'
import LanguageFlyoutMenu from './LanguageFlyoutMenu'

import Logo from '../assets/svg/logo.inline.svg'

const Wrapper = styled.header`
/*  display: flex;
  justify-content: space-between;*/
`;

const Header = (siteTitle) => {
	const { title } = siteTitle
	return (
		<>
			<Wrapper>
				<nav className="relative">
					<div className="max-w-7xl mx-auto px-4 sm:px-6">
						<div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">

							<div className="flex justify-start lg:w-0 lg:flex-1 items-center">
								{/*<Logo 
									className="inline object-cover w-16 h-16 mr-2 rounded-full"
									alt="Placeholder logo for your site" 
								/>*/}
								<h2 className="text-xl font-bold">{title}</h2>
							</div>

							<LanguageFlyoutMenu />
							<DarkToggle />
						</div>
					</div>
				</nav>
			</Wrapper>
		</>
	)
}

Header.propTypes = {
	siteTitle: PropTypes.string,
}

Header.defaultProps = {
	siteTitle: ``,
}

export default Header