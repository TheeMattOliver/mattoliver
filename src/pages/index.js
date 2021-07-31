/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import Layout from '../components/Layout'
import PageHero from "../components/PageHero";
import Spacer from "../components/Spacer"


const homeHeadline = 'Product-focused, creative engineer on a mission.'


export default function Home() {
	return (
		<>
			<Layout>
				<Wrapper>
					<PageHero>
						{homeHeadline}
					</PageHero>
					<HeroCopy>
						Product manager and developer with experience working across the entire product stack - from turning written business requirements into scoped user stories, to shipping production code and beyond. Currently building political tech to power progressive social causes. Interested in collaborating with teams of misfits, outcasts, and hell-raisers who want to create positive change and challenge the status quo.
					</HeroCopy>
					{/* <Spacer axis='vertical' size={1000} /> */}

				</Wrapper>
			</Layout>
		</>
	);
}
const Wrapper = styled.div`
	/* width: 100%; */
`;

const HeroCopy = styled.p`
  color: var(--color-textPrimary);
	margin-top: .75rem;
	padding: 0 1.5rem;
	line-height: 1.5rem;
  font-size: clamp(
    .78rem,
    2.3vw + .9rem,
    1.45rem
  );

  width: clamp(300px, 95%, 750px);
`;
