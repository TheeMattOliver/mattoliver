/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import { QUERIES, COLORS, WEIGHTS } from '../../constants';

import UnstyledButton from '../UnstyledButton';
import Icon from '../Icon';
import VisuallyHidden from '../VisuallyHidden';
import { ThemeContext } from '../ThemeContext';

const MobileMenu = ({ isOpen, onDismiss }) => {
  const { colorMode, setColorMode } = useContext(ThemeContext);

  return (
    <Overlay isOpen={isOpen} onDismiss={onDismiss}>
      <Content>
        <CloseButton onClick={onDismiss}>
          <Icon
            id="close"
            strokeWidth={2}
            size={24}
            color={`${colorMode === 'light' ? COLORS.textPrimary.light : COLORS.textPrimary.dark}`}
            width={24} />
          <VisuallyHidden>
            Close menu
          </VisuallyHidden>

        </CloseButton>
        <Nav>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/work">Work</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </Nav>
        <Filler />
      </Content>
    </Overlay>
  );
};

export default MobileMenu;

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsl(220deg 5% 40% / 0.8);
  display: flex;
  justify-content: flex-end;
`;

const Content = styled(DialogContent)`
  background: var(--color-background);
  width: 300px;
  height: 100%;
  padding: 32px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  // give it a larger tap target with the padding
  top: 10px;
  right: 0;
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const NavLink = styled.a`
  color: var(--color-textPrimary);
  text-decoration: none;
  font-size: 2.125rem;

  &:first-of-type {
    color: var(--color-textSecondary);
  }
`;

const Filler = styled.div`
  flex: 1
`;