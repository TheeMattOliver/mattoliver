/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import MainLayout from '../components/MainLayout'
import PageHero from "../components/PageHero";


const SecondaryHead = styled.h2`
	color: var(--color-textSecondary);
`;
const TertiaryHead = styled.h3`
	color: var(--color-textTertiary);
`;
const StyledLink = styled.a`
	color: var(--color-textLink);
`;

export default function AboutPage() {
  return (
    <>
      <MainLayout>
        <Wrapper>
          <PageHero>About page</PageHero>
        </Wrapper>
      </MainLayout>
    </>
  );
}

const Wrapper = styled.div`
	
`;
