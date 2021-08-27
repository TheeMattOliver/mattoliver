/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import SEO from "../components/SEO";
import MainLayout from '../components/MainLayout'
import PageHero from "../components/PageHero";

import { QUERIES } from "../constants";
import Spacer from "../components/Spacer";
import HeroButtonGroup from "../components/HeroButtonGroup";
import RecentProjectList from "../components/RecentProjectList";

const homeHeadline = 'Product-focused, creative engineer on a mission.'

// const copyText = 'Product manager, developer, and maker with experience working across the entire product stack - from turning written business requirements into scoped user stories, to shipping production code and beyond. Currently building political tech to power progressive social causes and always interested in collaborating with teams of misfits, outcasts, and hell-raisers who want to create positive change and challenge the status quo.'
const copyText = 'Currently building political tech to power progressive social causes. Always interested in collaborating with teams of misfits, outcasts, and hell-raisers who want to create positive change and challenge the status quo.'

export default function Home() {
	const intl = useIntl()
	return (
		<>
			<SEO
				title={`Home`}
				lang={intl.locale}>
			</SEO>
			<MainLayout>
				<Wrapper>
					{/* Hero */}
					<HeroWrapper>
						<PageHero>
							{homeHeadline}
						</PageHero>
						<HeroCopyWrapper>
							<HeroCopyText>
								{copyText}
							</HeroCopyText>
						</HeroCopyWrapper>
						<Spacer axis='vertical' size={100} />
						<HeroButtonGroup />
					</HeroWrapper>
					{/* Recent projects */}
					<RecentProjectList />

				</Wrapper>
			</MainLayout>
		</>
	);
}
const Wrapper = styled.div`
`;

const HeroCopyWrapper = styled.div`
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
  }
`;

const HeroCopyText = styled.p`
  color: var(--color-textPrimary);
	margin-top: .75rem;
	padding: 0 1rem;
	line-height: 1.5rem;
  font-size: clamp(
    1rem,
    /* 1.3vw + .9rem, */
		1.25vw + .5rem,
    1.45rem
  );
  width: clamp(300px, 95%, 750px);
	@media ${QUERIES.tabletAndUp} {
		padding: 0 1.5rem;
	}
`;

const HeroWrapper = styled.div`
	/* min-height: 80vh; */
`;