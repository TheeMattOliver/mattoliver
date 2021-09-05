/* eslint-disable no-unused-vars */
import React from "react"

import MainLayout from "../components/MainLayout";
import SEO from "../components/SEO";

import ContactFormComponent from "../components/ContactForm/ContactFormComponent";

export default function ContactPage() {
  return (
    <>
      <SEO
        title={`Matt Oliver`}>
      </SEO>
      <MainLayout>

        <ContactFormComponent />
      </MainLayout>
    </>
  );
}

