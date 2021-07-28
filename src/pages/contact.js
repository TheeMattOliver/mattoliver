/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import Layout from '../components/Layout'
import PageHero from "../components/PageHero";

const Wrapper = styled.div`
	
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

export default function ContactPage() {
  return (
    <>
      <Layout>
        <Wrapper>
          <PageHero>Contact page</PageHero>
        </Wrapper>
      </Layout>
    </>
  );
}
