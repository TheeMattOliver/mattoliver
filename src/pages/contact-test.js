/* eslint-disable no-unused-vars */
/*eslint-disable jsx-a11y/label-has-associated-control */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import MainLayout from "../components/MainLayout";
import { QUERIES, WEIGHTS } from "../constants";

export default function ContactPage() {
  return (
    <>
      <MainLayout>
        <Wrapper>

          <ContactCopySection>
            <ContactHeader>
              Contact
            </ContactHeader>
            <ContactDescription>
              <p>Email me through this contact form. Here is some more placeholder text and I'm using this bc I got tired of the page asking me to translate Latin.</p>

              <p>Or, feel free to email me directly: <a href="mailto:matt@mattoliver.xyz" rel="noopener noreferrer" target="_blank">matt@mattoliver.xyz</a></p>
            </ContactDescription>
          </ContactCopySection>

          <ContactFormSection>
            <ContactForm>
              <ContactFormRow>
                <label for="email">Email</label>

              </ContactFormRow>
              <ContactFormRow>
                <label for="message">Message</label>
                <textarea required="" placeholder="Your message goes here" id="message"></textarea>
              </ContactFormRow>
            </ContactForm>
          </ContactFormSection>
        </Wrapper>
      </MainLayout>
    </>
  );
}

const Wrapper = styled.div`
  flex: 1;
	display: grid;
  grid-template-areas:
    'contact-copy'
    'contact-form';
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media ${QUERIES.laptopAndUp} {
    grid-template-areas:
      'contact-copy contact-form'
      'contact-copy contact-form';
    grid-template-columns: 1fr 1.25fr;
    grid-template-rows: 8rem 1fr;
  }
  
  gap: 16px;
  margin: 0 auto;
  isolation: isolate;
  color: var(--color-textPrimary);
`;

const PageHeroGridWrapper = styled.div`
  grid-area: hero;
`
const ContactCopySection = styled.section`
  position: relative;
  grid-area: contact-copy;
  padding: 1.5rem 2.5rem;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  background: tomato;
  @media ${QUERIES.laptopAndUp} {
    max-width: 80rem;
    min-width: 35rem;
  }
`;
const ContactHeader = styled.h1`
  @media ${QUERIES.laptopAndUp} {
    margin-top: 4rem;
  }
  font-size: 32px;
  margin-bottom: 16px;
`;
const ContactDescription = styled.div`
  max-width: 48rem;
  p {
    color: var(--color-textPrimary);
    margin-top: .75rem;
    margin-bottom: 1.5rem;
    line-height: 1.5rem;
    font-size: clamp(
      1rem,
      /* 1.3vw + .9rem, */
      1.25vw + .5rem,
      1.45rem
    );
  } 
`;

const ContactFormSection = styled.div`
  grid-area: contact-form;
  padding: 1rem;
  border: 1px solid tomato;
  max-width: 40rem;
  @media ${QUERIES.tabletAndUp} {
    margin-left: 16px;
  }
  @media ${QUERIES.laptopAndUp} {
    margin-left: 0;
    margin-top: 4rem;
    grid-column: span 2 / span 2;
  }
`;

const ContactForm = styled.form`

`;

const ContactFormRow = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: baseline;
  align-items: baseline;
  margin-bottom: 24px;
  label {
    flex: 1;
    /* width: 115px; */
    font-size: 1rem;
    color: var(--color-textSecondary);
    margin-bottom: .5rem;
    margin-left: 12px
  }
  textarea {
    width: 75%;
    height: 250px;
    background: var(--color-backgroundPrimary);
    border: 1px solid var(--color-borderPrimary);
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 1rem;
    font-family: inherit;
    font-weight: ${WEIGHTS.normal};
    color: var(--color-text);
    resize: vertical;
    outline: none;
  }
  @media ${QUERIES.tabletAndUp} {
    flex-direction: row;
  }
  @media ${QUERIES.tabletAndUp} {
    label {
      flex: 1 1 0%;
      /* width: 115px; */
      font-size: 1rem;
      color: var(--color-textSecondary);
      margin-left: 0;
    }
  }
`;