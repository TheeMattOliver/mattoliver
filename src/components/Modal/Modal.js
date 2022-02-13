import React from "react"
import styled from "styled-components"
import { DialogOverlay, DialogContent } from "@reach/dialog"
import { Icon } from "../Icon"
const MOBILE_BREAKPOINT = 550

/*
Modals are hard to get right if you're navigating with the keyboard.

Focus remains in the background when you open it, and if you have 50 or 100 links,
the person would have to tab through all of them to get into the working space.

1. When modal opens it should move focus to the close button.
2. Focus should be locked to the modal, so if you tab it should cycle focus back to the
escape button in a never-ending loop.
3. The 'esc' key should close the modal, so keyboard users don't have to rewind their focus all the way up
4. Focus should be restored to the element that was focused before the modal was opened, which 
is usually the modal trigger.
5. Annotate markup so people using screen-readers know that it is a modal. Make sure it's
clear that users who can't see the screen visually can understand it's a dialog and not just
another part of the page.
*/

const Modal = ({ title, isOpen, handleDismiss, children }) => {
  // we handle the case if not open with props through Reach UI now
  // if (!isOpen) {
  //   return null;
  // }

  return (
    <Overlay isOpen={isOpen} onDismiss={handleDismiss}>
      <Content aria-label={title}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={handleDismiss}>
            <Icon
              id="close"
              color="inherit"
              size={24}
              width={24}
              strokeWidth={2}
            />
            <VisuallyHidden>Dismiss modal</VisuallyHidden>
          </CloseButton>
        </Header>
        <ChildWrapper>{children}</ChildWrapper>
      </Content>
    </Overlay>
  )
}

const Overlay = styled(DialogOverlay)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsl(0deg 0% 0% / 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Content = styled(DialogContent)`
  position: relative;
  background: var(--color-backgroundOverlay);
  border-radius: 8px;
  width: 65%;
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`

const Header = styled.header`
  padding: 16px;
  padding-bottom: 8px;
  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    padding: 4px;
    padding-left: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid hsl(0deg 0% 80%);
  }
`

const CloseButton = styled.button`
  color: white;
  position: absolute;
  top: -48px;
  right: 0;
  background: transparent;
  border: none;
  width: 48px;
  height: 48px;
  cursor: pointer;
  /* for tightly spaced square buttons, getting 
  the centering behavior can be tough, and you can use flex
  behavior */
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${MOBILE_BREAKPOINT}px) {
    /* for flex behavior to kick in, use position: static
    instead of top: 0px */
    position: static;
    /* top: 0px; */
    color: black;
  }
`

const Title = styled.h2`
  font-size: 1.5rem;
`

const VisuallyHidden = styled.span`
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  border: 0;
`

const ChildWrapper = styled.div`
  padding: 16px;
`
export default Modal
