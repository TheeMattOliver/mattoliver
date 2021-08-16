/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { COLORS, QUERIES, WEIGHTS } from '../../constants';
import VisuallyHidden from '../VisuallyHidden';

export default function ContactForm() {
  return (
    <ContactFormContainer>
      <VisuallyHidden>
        Contact form
      </VisuallyHidden>

      <Grid>
        {/* Contact information */}
        <ContactInformation>
          {/* 
          <div className="absolute inset-0 pointer-events-none sm:hidden" aria-hidden="true">
            <svg
              className="absolute inset-0 w-full h-full"
              width={343}
              height={388}
              viewBox="0 0 343 388"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                fill="url(#linear1)"
                fillOpacity=".1"
              />
              <defs>
                <linearGradient
                  id="linear1"
                  x1="254.553"
                  y1="107.554"
                  x2="961.66"
                  y2="814.66"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 w-full h-full"
              width={359}
              height={339}
              viewBox="0 0 359 339"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                fill="url(#linear2)"
                fillOpacity=".1"
              />
              <defs>
                <linearGradient
                  id="linear2"
                  x1="192.553"
                  y1="28.553"
                  x2="899.66"
                  y2="735.66"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div
            className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block"
            aria-hidden="true"
          >
            <svg
              className="absolute inset-0 w-full h-full"
              width={160}
              height={678}
              viewBox="0 0 160 678"
              fill="none"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                fill="url(#linear3)"
                fillOpacity=".1"
              />
              <defs>
                <linearGradient
                  id="linear3"
                  x1="192.553"
                  y1="325.553"
                  x2="899.66"
                  y2="1032.66"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" />
                  <stop offset={1} stopColor="#fff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </svg>
          </div> 
          */}

          <h3>Contact</h3>
          <p>
            I'd love to hear from you about working together or scheduling some time to talk.
          </p>
          <p>This form's submissions are forwarded to my personal inbox, or as an alternative you can also feel free to email me directly: <a href="mailto:matt@mattoliver.xyz" rel="noopener noreferrer" target="_blank">matt@mattoliver.xyz</a></p>

          {/* <dl className="space-y-6">
            <dt>
              <VisuallyHidden>Phone number</VisuallyHidden>
            </dt>
            <dd>
              <Icon id={`phone`} size={24} width={24} color={`${COLORS.blue100.light}`} aria-hidden="true" />
              <span className="ml-3">+1 (555) 123-4567</span>
            </dd>
            <dt>
              <VisuallyHidden>Email</VisuallyHidden>
            </dt>
            <dd>
              <Icon id={`email`} size={24} width={24} strokeWidth={2} color={`${COLORS.blue100.light}`} aria-hidden="true" />
              <span>matt@mattoliver.xyz</span>
            </dd>
          </dl> */}
          <SocialIconsList role="list" className="space-x-12">
            <li>
              <a href="https://observablehq.com/collection/@theemattoliver/census-data-states-and-counties"
                rel="noopener noreferrer"
                target="_blank">
                <VisuallyHidden>Observable</VisuallyHidden>
                <svg
                  role="img"
                  viewBox="0 0 25 28"
                  width="25"
                  height="28"
                  aria-label="Observable logo"
                  aria-hidden="true"
                  fill="currentColor"
                  style={{ "height": "24px", "width": "24px" }}>
                  <path d="M12.5 22.6667C11.3458 22.6667 10.3458 22.4153 9.5 21.9127C8.65721 21.412 7.98339 20.7027 7.55521 19.8654C7.09997 18.9942 6.76672 18.0729 6.56354 17.1239C6.34796 16.0947 6.24294 15.0483 6.25 14C6.25 13.1699 6.30417 12.3764 6.41354 11.6176C6.52188 10.8598 6.72292 10.0894 7.01563 9.30748C7.30833 8.52555 7.68542 7.84763 8.14479 7.27274C8.62304 6.68378 9.24141 6.20438 9.95208 5.87163C10.6979 5.51244 11.5458 5.33333 12.5 5.33333C13.6542 5.33333 14.6542 5.58467 15.5 6.08733C16.3428 6.588 17.0166 7.29733 17.4448 8.13459C17.8969 8.99644 18.2271 9.9103 18.4365 10.8761C18.6448 11.841 18.75 12.883 18.75 14C18.75 14.8301 18.6958 15.6236 18.5865 16.3824C18.4699 17.1702 18.2639 17.9446 17.9719 18.6925C17.6698 19.4744 17.2948 20.1524 16.8427 20.7273C16.3906 21.3021 15.7927 21.7692 15.0479 22.1284C14.3031 22.4876 13.4542 22.6667 12.5 22.6667ZM14.7063 16.2945C15.304 15.6944 15.6365 14.864 15.625 14C15.625 13.1073 15.326 12.3425 14.7292 11.7055C14.1313 11.0685 13.3885 10.75 12.5 10.75C11.6115 10.75 10.8688 11.0685 10.2708 11.7055C9.68532 12.3123 9.36198 13.1405 9.375 14C9.375 14.8927 9.67396 15.6575 10.2708 16.2945C10.8688 16.9315 11.6115 17.25 12.5 17.25C13.3885 17.25 14.124 16.9315 14.7063 16.2945ZM12.5 27C19.4031 27 25 21.1792 25 14C25 6.82075 19.4031 1 12.5 1C5.59687 1 0 6.82075 0 14C0 21.1792 5.59687 27 12.5 27Z" fill="currentColor"></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://github.com/TheeMattOliver"
                rel="noopener noreferrer"
                target="_blank"
              >
                <VisuallyHidden>GitHub</VisuallyHidden>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ "height": "24px", "width": "24px" }}
                  aria-label="Github"
                  aria-hidden="true"
                >
                  <path
                    d="M11.999 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.386.6.11.819-.26.819-.578 0-.284-.01-1.04-.017-2.04-3.337.724-4.042-1.61-4.042-1.61-.545-1.386-1.332-1.755-1.332-1.755-1.09-.744.082-.73.082-.73 1.205.086 1.838 1.238 1.838 1.238 1.07 1.833 2.81 1.304 3.493.996.109-.775.419-1.303.762-1.603C7.145 17 4.343 15.97 4.343 11.373c0-1.31.468-2.382 1.236-3.22-.124-.304-.536-1.524.118-3.176 0 0 1.007-.323 3.3 1.23.956-.266 1.983-.4 3.003-.404 1.02.005 2.046.138 3.005.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.652.243 2.872.12 3.176.77.838 1.233 1.91 1.233 3.22 0 4.61-2.806 5.624-5.478 5.921.43.37.814 1.103.814 2.223 0 1.603-.015 2.898-.015 3.291 0 .321.217.695.825.578C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12.001-12"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/TheeMattOliver"
                rel="noopener noreferrer"
                target="_blank"
              >
                <VisuallyHidden>Twitter</VisuallyHidden>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  style={{ "height": "24px", "width": "24px" }}
                >
                  <path
                    d="M7.548 22.501c9.056 0 14.01-7.503 14.01-14.01 0-.213 0-.425-.015-.636A10.02 10.02 0 0024 5.305a9.828 9.828 0 01-2.828.776 4.94 4.94 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.929 4.929 0 00-8.391 4.491A13.98 13.98 0 011.67 3.9a4.928 4.928 0 001.525 6.573A4.887 4.887 0 01.96 9.855v.063a4.926 4.926 0 003.95 4.827 4.917 4.917 0 01-2.223.084 4.93 4.93 0 004.6 3.42A9.88 9.88 0 010 20.289a13.941 13.941 0 007.548 2.209"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </li>
          </SocialIconsList>
        </ContactInformation>

        {/* Contact form */}
        <FormWrapper>
          <h3>Send a message</h3>
          <Form
            method="POST"
            netlify-honeypot="bot-field"
            data-netlify="true"
            name="website-contact-form"
            className="gap-y-6 sm:gap-x-8"
            action="/thank-you"
          >
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="website-contact-form" />
            <div>
              <Label htmlFor="first-name">
                First name
              </Label>
              <InputWrapper>
                <Input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </InputWrapper>
            </div>
            <div>
              <Label htmlFor="last-name">
                Last name
              </Label>
              <InputWrapper>
                <Input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </InputWrapper>
            </div>
            <div>
              <Label htmlFor="email">
                Email
              </Label>
              <InputWrapper>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </InputWrapper>
            </div>
            <div>
              <div className="flex justify-between">
                <Label htmlFor="phone">
                  Phone
                </Label>
                <OptionalText id="phone-optional">
                  Optional
                </OptionalText>
              </div>
              <InputWrapper>
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  aria-describedby="phone-optional"
                />
              </InputWrapper>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="subject">
                Subject
              </Label>
              <InputWrapper>
                <Input
                  type="text"
                  name="subject"
                  id="subject"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </InputWrapper>
            </div>
            <div className="sm:col-span-2">
              <div className="flex justify-between">
                <Label htmlFor="message">
                  Message
                </Label>
                <OptionalText id="message-max">
                  Max. 500 characters please
                </OptionalText>
              </div>
              <InputWrapper>
                <TextArea
                  id="message"
                  name="message"
                  rows={4}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  aria-describedby="message-max"
                  defaultValue={''}
                />
              </InputWrapper>
            </div>
            <div className="sm:col-span-2 sm:flex sm:justify-end">
              <Button
                type="submit"
                className="shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto"
              >
                Submit
              </Button>
            </div>
          </Form>
        </FormWrapper>
      </Grid>
    </ContactFormContainer>
  )
}

const ContactFormContainer = styled.div`
  flex: 1;
  /* relative bg-white shadow-xl */
  position: relative;
  background: var(--color-background);
`;

const Grid = styled.div`
  /* grid grid-cols-1 lg:grid-cols-3 */
  min-height: 100%;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media ${QUERIES.laptopAndUp} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const ContactInformation = styled.div`
  /* relative overflow-hidden py-10 px-6 bg-indigo-700 sm:px-10 xl:p-12 */
  position: relative;
  overflow: hidden;
  padding: 4rem 1rem;
  background: var(--color-panelBackgroundDark);
  /* text-lg font-medium text-white */
  h3 {
    font-size: 2rem;
  margin-bottom: 1rem;
  color: ${COLORS.gray50.light};
  }
  /* mt-6 text-base text-indigo-50 max-w-3xl */
  p {
    margin-top: 1.5rem;
    color: ${COLORS.gray100.light};
    max-width: 48rem;
    line-height: 1.5rem;
    font-size: clamp(
      1rem,
      /* 1.3vw + .9rem, */
      1.25vw + .5rem,
      1.45rem
    );
    width: clamp(300px, 95%, 750px);
  }
  /* mt-8 space-y-6 */
  dl {
    margin-top: 2rem;
  }
  /* flex text-base text-indigo-50 */
  dd {
    display: flex;
    color: ${COLORS.blue50.light};
    line-height: 1.5rem;
  }
  dd span {
    margin-left: 0.75rem;
  }
  li a {
    /* text-indigo-200 hover:text-indigo-100 */
    color: ${COLORS.blue100.light};
    &:hover {
      color: ${COLORS.blue500.light};
    }
    &:focus-visible {
      color: ${COLORS.blue500.light};
    }
  }
  @media ${QUERIES.desktopAndUp} {
    padding: 4rem 1.5rem;
    padding: 3rem;
  }
`;


const SocialIconsList = styled.ul`
  /* mt-8 flex space-x-12 */
  margin-top: 2rem;
  display: flex;
`;

const FormWrapper = styled.div`
  /* py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12 */
  padding-top: 2.5rem;
  padding: 1rem;
  h3 {
    /* text-lg font-medium text-gray-900 */
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: var(--color-textPrimary);
  }
  @media ${QUERIES.tabletAndUp} {
    padding: 2.5rem;
    grid-column: span 2 / span 2;
  }
  @media ${QUERIES.desktopAndUp} {
    padding: 3rem; 
  }
`;

const Form = styled.form`
  /* mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 */
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  input, select, textarea {
    color: var(--color-textPrimary);
  }
  @media ${QUERIES.tabletAndUp} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Label = styled.label`
  /* block text-sm font-medium text-gray-900 */
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: ${WEIGHTS.medium};
  color: var(--color-textPrimary);
`;

const InputWrapper = styled.div`
  margin: 0.25rem;
`;

const Input = styled.input`
  /* py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md */
  padding: 0.75rem 1rem;
  display: block;
  width: 100%;
  background: var(--color-backgroundPrimary);
  color: ${COLORS.gray900.light};
  border: 1px solid var(--color-borderPrimary);
  border-radius: 0.375rem;
  box-shadow: none;
  @media ${QUERIES.tabletAndUp} {
    box-shadow: revert;
  }
`;

const TextArea = styled.textarea`
  /* py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md */
  padding: 0.75rem 1rem;
  display: block;
  width: 100%;
  background: var(--color-backgroundPrimary);
  color: ${COLORS.gray900.light};
  border: 1px solid var(--color-borderPrimary);
  border-radius: 0.375rem;
`;

const OptionalText = styled.span`
  /* text-sm text-gray-500 */
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--color-textSecondary);
`;

const Button = styled.button`
  /* mt-2 w-full inline-flex items-center justify-center px-6 py-3 border 
  border-transparent rounded-md shadow-sm text-base font-medium text-white 
  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
  focus:ring-offset-2 focus:ring-blue-500 sm:w-auto */
  margin-top: 0.5rem;
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-width: 1px;
  border-color: transparent;
  border-radius: 0.375rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: ${WEIGHTS.medium};
  color: var(--color-white);
  background: var(--color-buttonPrimary);
  &:hover {
    background: ${COLORS.blue700.light}
  }
  @media ${QUERIES.tabletAndUp} {
    width: auto;
  }
`;
