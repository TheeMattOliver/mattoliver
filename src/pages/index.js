import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import Layout from '../components/Layout'
import PageHero from "../components/PageHero";
import Spacer from "../components/Spacer"

const Wrapper = styled.div`
	/* width: 100%; */
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

const homeHeadline = 'Product-focused, creative engineer on a mission.'

export default function Home() {
	return (
		<>
			<Layout>
				<Wrapper>
					<PageHero>Product-focused, creative engineer on a mission.</PageHero>
					<Spacer axis='vertical' size={1000} />
				</Wrapper>
			</Layout>
		</>
	);
}
