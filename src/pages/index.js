import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"
import { COLORS } from "../constants"

import Layout from '../components/Layout'
import BrightTitle from '../components/BrightTitle'

const HomeContainer = styled.div`
	padding: 16px;
	width: 100%;
	background-color: honeydew; 
`;

const SecondaryHead = styled.h2`
	color: var(--color-textSecondary);
`;
const TertiaryHead = styled.h3`
	color: var(--color-textTertiary);
`;
const StyledLink = styled.a`
	color: var(--color-textLink);
`;

export default function Home() {
	return (
		<>
			<Layout>
				<HomeContainer>
					{/* <BrightTitle className="text-red-500">
						Big H1
					</BrightTitle>
					<SecondaryHead>
						I am a secondary color H2
					</SecondaryHead>
					<TertiaryHead>
						I am a tertiary color H3
					</TertiaryHead>
					<StyledLink>
						I am a link
					</StyledLink> */}
				</HomeContainer>
			</Layout>
		</>
	);
}
