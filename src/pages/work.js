/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import MainLayout from '../components/MainLayout'
import PageHero from "../components/PageHero";
import BasicGrid from "../components/BasicGrid";

export default function WorkPage() {
  return (
    <>
      <MainLayout>
        <Wrapper>
          <PageHero>Projects page</PageHero>
          <BasicGrid />
        </Wrapper>
      </MainLayout>
    </>
  );
}
const Wrapper = styled.div`
  position: relative;
`;
