/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"

import VisuallyHidden from "../VisuallyHidden"
import Icon from "../Icon"
import { COLORS, WEIGHTS } from "../../constants"

const Footer = () => {

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
					<VisuallyHidden>Github</VisuallyHidden>
					View source
				</FooterLink>
			</FooterLeft>


			<FooterLink href="mailto:matt@mattoliver.xyz">
				<VisuallyHidden>Email</VisuallyHidden>
				<Icon id={`email`} size={24} width={24} strokeWidth={2} aria-hidden="true" />
				{/* <svg className={`hover:text-blue-900 transition ease-in-out duration-150 h-10 w-10`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg> */}
			</FooterLink>

			<FooterLink
				href="https://github.com/theemattoliver"
				rel="noopener noreferrer"
				target="_blank">
				<VisuallyHidden>Gihtub</VisuallyHidden>
				<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="24" width="24" fill="currentColor">
					<path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
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
	color: var(--color-textSecondary);
	font-weight: ${WEIGHTS.medium};
	& > svg {
    display: block;
  }
	&:hover {
		color: ${COLORS.blue500.light};
	}
`;
