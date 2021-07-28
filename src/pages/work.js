/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import Layout from '../components/Layout'
import PageHero from "../components/PageHero";

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

export default function WorkPage() {
  return (
    <>
      <Layout>
        <Wrapper>
          <PageHero>Projects page</PageHero>
        </Wrapper>
      </Layout>
    </>
  );
}
