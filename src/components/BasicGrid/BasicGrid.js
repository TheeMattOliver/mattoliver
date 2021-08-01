/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';
import { QUERIES } from '../../constants';

const BasicGrid = () => {
  return (
    <GridWrapper>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
      <ItemTest></ItemTest>
    </GridWrapper>
  )
}

export default BasicGrid

const GridWrapper = styled.div`
  /* display: grid;
  padding: 16px;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr)); */
  --min-column-width: min(320px, 100%);
    display: grid;
    grid-template-columns:
      repeat(auto-fill, minmax(var(--min-column-width), 1fr));
    gap: 16px;
    padding: 16px;
`;

const ItemTest = styled.div`
  height: 225px;
  background: tomato;
  border-radius: 8px;
  padding: 16px;
`;