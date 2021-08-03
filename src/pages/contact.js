/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import MainLayout from '../components/MainLayout'
import PageHero from "../components/PageHero";
import { QUERIES } from "../constants";


export default function ContactPage() {
  return (
    <>
      <MainLayout>
        <Wrapper>
          <PageHeroGridWrapper>
            <PageHero>Contact page</PageHero>
          </PageHeroGridWrapper>

          <ContactCopySection>
            <ContactCopy>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </ContactCopy>
          </ContactCopySection>

        </Wrapper>
      </MainLayout>
    </>
  );
}

const Wrapper = styled.div`
  flex: 1;
	display: grid;
  grid-template-areas:
  'hero hero'
  'contact-copy contact-form';
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 8rem 1fr;
  gap: 16px;
  margin: 0 auto;
  isolation: isolate;
  color: var(--color-textPrimary);
`;

const PageHeroGridWrapper = styled.div`
  grid-area: hero;
`
const ContactCopySection = styled.section`
  grid-area: contact-copy;
  padding: 0 1.5rem;
  margin-left: auto;
  margin-right: auto;
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
    min-width: 35rem;
  }
`;

const ContactCopy = styled.p`
  color: var(--color-textPrimary);
	margin-top: .75rem;
	line-height: 1.5rem;
  font-size: clamp(
    1rem,
    /* 1.3vw + .9rem, */
		1.25vw + .5rem,
    1.45rem
  );
`;