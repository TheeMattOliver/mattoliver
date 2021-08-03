/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import MainLayout from "../components/MainLayout";
import ContactForm from "../components/ContactForm"
import { QUERIES, WEIGHTS } from "../constants";

export default function ContactPage() {
  return (
    <>
      <MainLayout>
        <ContactForm />
      </MainLayout>
    </>
  );
}

