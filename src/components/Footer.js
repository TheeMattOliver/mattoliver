import React from "react"
import styled from "styled-components"

import { Link } from "gatsby"

import { ReactComponent as Logo } from '../assets/svg/logo.inline.svg'


const FooterWrap = styled.footer`
	background: var(--color-footerBackground);
	color: var(--color-footerText);
	a {
		color: var(--color-footerText);
		&:hover {
			text-decoration: underline;
		}
	}
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
		<FooterWrap>
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
			{/*
				<div className="flex flex-justify-center pb-6">
					<div className="f6 color-text-tertiary">
						<p>Built with <span role="img" aria-label="love">❤️</span> by 
						{` `}
						<a href={siteUrl}>{author}</a>
						</p>
					</div>
				</div>
			*/}

			</div>
		</FooterWrap>
		)
}

export default Footer