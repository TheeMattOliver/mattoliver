import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import Layout from '../components/Layout'
import HomeHero from "../components/HomeHero";

const Wrapper = styled.div`
	width: 100%;
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
        <Wrapper>
          <h1>Contact</h1>
        </Wrapper>
      </Layout>
    </>
  );
}
