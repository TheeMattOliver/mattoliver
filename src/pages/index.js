import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import Layout from '../components/Layout'
import BrightTitle from '../components/BrightTitle'

const HomeContainer = styled.div`
	padding: 16px;
`;

export default function Home() {
	return (
		<>
			<Layout>
				<HomeContainer>
					<BrightTitle>
						<FormattedMessage id="hello_world" />
					</BrightTitle>
				</HomeContainer>
			</Layout>
		</>
	);
}
