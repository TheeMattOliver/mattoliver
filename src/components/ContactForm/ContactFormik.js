/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import styled from "styled-components"
import { useFormik, Form, Formik, Field } from "formik"
import * as Yup from "yup"

import { COLORS, QUERIES, FONT_WEIGHTS } from "../../constants"
import VisuallyHidden from "../VisuallyHidden"
import FormSubmitThankYou from "../FormSubmitThankYou/"

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

const ContactFormik = () => {
  const [submissionMessage, setSubmissionMessage] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(25, "Must be 25 characters or less")
          .required("First name is a required field."),
        lastName: Yup.string()
          .max(40, "Must be 40 characters or less")
          .required("Last name is a required field."),
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is a required field."),
        message: Yup.string().max(
          500,
          "Uh oh, your message is too long. Please keep your message to 500 characters or less."
        ),
      })}
      onSubmit={(values, actions) => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": "website-contact-form",
            ...values,
          }),
        })
          .then(() => {
            setSubmissionMessage("Success!")
            setIsSubmitted(true)
            actions.resetForm()
          })
          .catch(() => {
            setSubmissionMessage(
              "Sorry, looks like something's going wrong on my end. If you wouldn't mind, please email me at matt@mattoliver.xyz so I can get it fixed."
            )
          })
          .finally(() => actions.setSubmitting(false))
      }}
    >
      {formik =>
        !isSubmitted ? (
          <StyledForm
            method="POST"
            netlify-honeypot="bot-field"
            data-netlify="true"
            name="website-contact-form"
            className="gap-y-6 sm:gap-x-8"
            onSubmit={formik.handleSubmit}
          >
            <input type="hidden" name="bot-field" />
            <input
              type="hidden"
              name="form-name"
              value="website-contact-form"
            />
            <div>
              <Label htmlFor="firstName">First name</Label>
              <InputWrapper>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  autoComplete="given-name"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...formik.getFieldProps("firstName")}
                />
              </InputWrapper>
              {formik.touched.firstName && formik.errors.firstName ? (
                <ErrorMessageWrapper>
                  <ErrorMessage>{formik.errors.firstName}</ErrorMessage>
                </ErrorMessageWrapper>
              ) : null}
            </div>
            <div>
              <Label htmlFor="lastName">Last name</Label>
              <InputWrapper>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  autoComplete="family-name"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...formik.getFieldProps("lastName")}
                />
              </InputWrapper>
              {formik.touched.lastName && formik.errors.lastName ? (
                <ErrorMessageWrapper>
                  <ErrorMessage>{formik.errors.lastName}</ErrorMessage>
                </ErrorMessageWrapper>
              ) : null}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <InputWrapper>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={`shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                  {...formik.getFieldProps("email")}
                />
              </InputWrapper>
              {formik.touched.email && formik.errors.email ? (
                <ErrorMessageWrapper>
                  <ErrorMessage>{formik.errors.email}</ErrorMessage>
                </ErrorMessageWrapper>
              ) : null}
            </div>
            <div>
              <div className="flex justify-between">
                <Label htmlFor="phone">Phone</Label>
                <OptionalText id="phone-optional">Optional</OptionalText>
              </div>
              <InputWrapper>
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  aria-describedby="phone-optional"
                  {...formik.getFieldProps("phone")}
                />
              </InputWrapper>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="subject">Subject</Label>
              <InputWrapper>
                <Input
                  type="text"
                  name="subject"
                  id="subject"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  {...formik.getFieldProps("subject")}
                />
              </InputWrapper>
            </div>
            <div className="sm:col-span-2">
              <div className="flex justify-between">
                <Label htmlFor="message">Message</Label>
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
                  // defaultValue={''}
                  {...formik.getFieldProps("message")}
                />
              </InputWrapper>
              {formik.touched.firstName && formik.errors.firstName ? (
                <ErrorMessageWrapper>
                  <ErrorMessage>{formik.errors.message}</ErrorMessage>
                </ErrorMessageWrapper>
              ) : null}
            </div>
            <div className="sm:col-span-2 sm:flex sm:justify-end">
              <Button
                type="submit"
                className="shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto"
              >
                Submit
              </Button>
            </div>
            {submissionMessage && <p>{submissionMessage}</p>}
          </StyledForm>
        ) : (
          <FormSubmitThankYou />
        )
      }
    </Formik>
  )
}

export default ContactFormik

const ContactFormContainer = styled.div`
  flex: 1;
  /* relative bg-white shadow-xl */
  position: relative;
  background: var(--color-background);
`

const Grid = styled.div`
  /* grid grid-cols-1 lg:grid-cols-3 */
  min-height: 100%;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media ${QUERIES.laptopAndUp} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const ContactInformation = styled.div`
  /* relative overflow-hidden py-10 px-6 bg-indigo-700 sm:px-10 xl:p-12 */
  position: relative;
  overflow: hidden;
  padding: 4rem 1rem;
  background: var(--color-backgroundOverlayDark);
  /* text-lg font-medium text-white */
  h3 {
    font-size: 2rem;
    margin-bottom: 16px;
    color: ${COLORS.gray50.light};
  }
  /* mt-6 text-base text-indigo-50 max-w-3xl */
  p {
    margin-top: 24px;
    color: ${COLORS.gray100.light};
    max-width: 48rem;
    line-height: 1.5rem;
    font-size: clamp(1rem, /* 1.3vw + .9rem, */ 1.25vw + 0.5rem, 1.45rem);
    width: clamp(300px, 95%, 750px);
  }
  /* mt-8 space-y-6 */
  dl {
    margin-top: 32px;
  }
  /* flex text-base text-indigo-50 */
  dd {
    display: flex;
    color: ${COLORS.blue50.light};
    line-height: 1.5rem;
  }
  dd span {
    margin-left: 12px;
  }
  li a {
    /* text-indigo-200 hover:text-indigo-100 */
    color: ${COLORS.blue100.light};
    &:hover {
      color: ${COLORS.blue500.light};
    }
  }
  @media ${QUERIES.desktopAndUp} {
    padding: 4rem 1.5rem;
    padding: 3rem;
  }
`

const SocialIconsList = styled.ul`
  /* mt-8 flex space-x-12 */
  margin-top: 32px;
  display: flex;
`

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
  @media ${QUERIES.smAndUp} {
    padding: 2.5rem;
    grid-column: span 2 / span 2;
  }
  @media ${QUERIES.desktopAndUp} {
    padding: 3rem;
  }
`

const StyledForm = styled(Form)`
  /* mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 */
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  input,
  select,
  textarea {
    color: var(--color-textPrimary);
  }
  @media ${QUERIES.smAndUp} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`

const Label = styled.label`
  /* block text-sm font-medium text-gray-900 */
  display: block;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: ${FONT_WEIGHTS.semibold};
  color: var(--color-textPrimary);
`

const InputWrapper = styled.div`
  margin: 4px;
`

const Input = styled.input`
  /* py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md */
  padding: 0.75rem 1rem;
  display: block;
  width: 100%;
  background: var(--color-backgroundPrimary);
  color: var(--color-gray900);
  border: 1px solid var(--color-borderPrimary);
  border-radius: 0.375rem;
  box-shadow: none;
  @media ${QUERIES.smAndUp} {
    box-shadow: revert;
  }
`

const TextArea = styled.textarea`
  /* py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md */
  padding: 0.75rem 1rem;
  display: block;
  width: 100%;
  background: var(--color-backgroundPrimary);
  color: ${COLORS.gray900.light};
  border: 1px solid var(--color-borderPrimary);
  border-radius: 0.375rem;
`

const OptionalText = styled.span`
  /* text-sm text-gray-500 */
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: var(--color-textSecondary);
`

const ErrorMessageWrapper = styled.div`
  margin-top: 6px;
  margin-bottom: 16px;
  margin-left: 4px;
`

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.85rem;
`

const Button = styled.button`
  /* mt-2 w-full inline-flex items-center justify-center px-6 py-3 border 
  border-transparent rounded-md shadow-sm text-base font-medium text-white 
  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 
  focus:ring-offset-2 focus:ring-blue-500 sm:w-auto */
  margin-top: 8px;
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
  font-weight: ${FONT_WEIGHTS.semibold};
  color: var(--color-white);
  background: var(--color-buttonPrimary);
  &:hover {
    background: ${COLORS.blue700.light};
  }
  @media ${QUERIES.smAndUp} {
    width: auto;
  }
`
