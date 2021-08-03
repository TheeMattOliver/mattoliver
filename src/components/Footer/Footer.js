/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"

import { Link } from "gatsby"

const Footer = () => {

	return (
		<FooterWrapper className="px-4 py-6 space-x-10">
			<FooterLeft className="space-x-4">
				<FooterCredit>
					&copy; {new Date().getFullYear()}
				</FooterCredit>

				{/* <FooterLink
					href="https://github.com/TheeMattOliver/mgo-portfolio-web"
					rel="noopener noreferrer"
					target="_blank"
				>
					<span className="sr-only">Github</span>
					View source
				</FooterLink> */}
			</FooterLeft>


			<FooterLink href="mailto:matt@mattoliver.computer" className="-mb-3">
				<span className="sr-only">Email</span>
				<svg className={`hover:text-blue-900 transition ease-in-out duration-150 h-10 w-10`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			</FooterLink>

			<FooterLink
				href="https://github.com/theemattoliver/mgo-portfolio-web"
				rel="noopener noreferrer"
				target="_blank">
				<span className="sr-only">Github</span>
				<svg className={`hover:text-blue-900 transition ease-in-out duration-150`} width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C27.42 29.06 32 23.06 32 16C32 7.16 24.84 0 16 0V0Z" fill="currentColor" />
				</svg>
			</FooterLink>

		</FooterWrapper>
	)
}

export default Footer

const FooterWrapper = styled.footer`
	display: flex;
	background: var(--color-background);
	border-top: 1px solid var(--color-borderPrimary);
	align-items: center;
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
