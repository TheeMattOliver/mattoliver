/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

import GridLayout from '../components/GridLayout'

import PageHero from "../components/PageHero";
import BasicGrid from "../components/BasicGrid";

export default function WorkPage() {
  return (
    <>
      <GridLayout>
        <Wrapper>
          <PageHero>Selected Work</PageHero>
          <BasicGrid />
        </Wrapper>
      </GridLayout>
    </>
  );
}
const Wrapper = styled.div`
  position: relative;
`;
