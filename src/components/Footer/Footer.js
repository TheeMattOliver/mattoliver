import React from "react"
import styled from "styled-components"

import { Link } from "gatsby"


const Footer = (siteMetaData) => {
	const { title, siteUrl } = siteMetaData.data

	return (
		<FooterWrapper className="px-4 py-6 space-x-10">
			<FooterLeft className="space-x-4">
				<FooterCredit>
					&copy; {new Date().getFullYear()}
				</FooterCredit>

				<FooterLink
					href="https://github.com/TheeMattOliver/mgo-portfolio-web"
					rel="noopener noreferrer"
					target="_blank"
				>
					<span className="sr-only">Github</span>
					View source
				</FooterLink>
			</FooterLeft>


			<FooterLink href="nailto:matt@mattoliver.computer" >
				<span className="sr-only">Email</span>
				Email
			</FooterLink>

			<FooterLink href="#" >
				<span className="sr-only">Github</span>
				Github
			</FooterLink>

		</FooterWrapper>
	)
}

export default Footer

const FooterWrapper = styled.footer`
	display: flex;
	background: var(--color-background);
	border: 2px solid black;
`;
const FooterLeft = styled.div`
	margin-right: auto;
	display: flex;
`;
const FooterCredit = styled.p`
	color: var(--color-textPrimary);
`;

const FooterLink = styled.a`
	color: var(--color-textLink);
`;
