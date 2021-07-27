import React from "react"
import styled from "styled-components"

import { Link } from "gatsby"

const FooterWrapper = styled.footer`
	background: var(--color-background);
`;

const FooterLeftContent = styled.div`
	flex: 1;
`;

const FooterRightContent = styled.div`
	flex: 1;
`;

const Footer = (siteMetaData) => {
	const { title, siteUrl } = siteMetaData.data

	return (
		<FooterWrapper>
			<div className="relative">
				<div className="max-w-7xl mx-auto px-4 sm:px-6">

					<div className="flex justify-between items-center py-6 md:justify-between md:space-x-10">

						<FooterLeftContent>
							<ul className="list-style-none flex flex-wrap col-12 col-lg-5 justify-center lg:justify-between mb-2 mb-lg-0">
								<li className="mr-3 mr-lg-0">© {new Date().getFullYear()} Your Org, Inc. </li>
								<li className="mr-3 mr-lg-0"><a href="https://www.aclu.org/aclu-site-user-agreement">Terms</a></li>
								<li className="mr-3 mr-lg-0"><a href="https://www.eff.org/policy">Privacy</a></li>
								<li className="mr-3 mr-lg-0"><a href="https://github.com/security">Security</a></li>
							</ul>
						</FooterLeftContent>

						<a aria-label="Homepage" title={title} href={siteUrl}>
							{/*					<Logo 
								className="inline object-cover w-32 h-32 mr-2 rounded-full"
								alt="Placeholder logo for your site"
								/>*/}
						</a>

						<FooterRightContent>
							<ul className="list-style-none flex flex-wrap col-12 col-lg-5 justify-center lg:justify-between mb-2 mb-lg-0">
								<li className="mr-3 mr-lg-0"><Link to='/'>Contact</Link></li>
								<li className="mr-3 mr-lg-0"><Link to='/'>Blog</Link></li>
								<li className="mr-3 mr-lg-0"><Link to='/'>About</Link></li>
							</ul>
						</FooterRightContent>

					</div>
				</div>
			</div>
		</FooterWrapper>
	)
}

export default Footer