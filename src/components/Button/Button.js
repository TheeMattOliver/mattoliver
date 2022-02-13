import React, { Component } from "react"
import styled from "styled-components"

import { COLORS, FONT_SIZES, FONT_WEIGHTS } from "../../constants"

const SIZES = {
  small: {
    "--borderRadius": 5 + "px",
    "--fontSize": FONT_SIZES[0],
    "--lineHeight": 24 / 16 + "rem",
    "--padding": "4px 12px",
    "--fontWeight": FONT_WEIGHTS.normal,
  },
  medium: {
    "--borderRadius": 5 + "px",
    "--fontSize": 18 / 16 + "rem",
    "--padding": "0px 16px",
    "--height": "38px",
    "--lineHeight": 24 / 16 + "rem",
    "--minWidth": 110 + "px",
    "--fontWeight": FONT_WEIGHTS.normal,
  },
  large: {
    "--borderRadius": 8 + "px",
    "--fontSize": 1.3125 + "rem",
    "--padding": "16px 32px",
    "--height": "50px",
    "--lineHeight": 38 / 16 + "rem",
    "--minWidth": 184 + "px",
    "--fontWeight": FONT_WEIGHTS.normal,
  },
}

const Button = ({ variant, size, children, ...props }) => {
  const styles = SIZES[size]

  let Component
  if (variant === "default") {
    Component = DefaultButton
  } else if (variant === "primary") {
    Component = PrimaryButton
  } else if (variant === "secondary") {
    Component = SecondaryButton
  } else if (variant === "outline") {
    Component = OutlineButton
  } else if (variant === "invisible") {
    Component = InvisibleButton
  } else {
    throw new Error(`Unrecognized Button variant: ${variant}`)
  }
  return (
    <Component style={styles} {...props}>
      {children}
    </Component>
  )
}

const ButtonBase = styled.button`
  flex: 1;
  appearance: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  margin: 0;
  user-select: none;

  flex-shrink: 0;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  box-sizing: border-box;

  font-size: var(--fontSize);
  border-radius: var(--borderRadius);
  padding: var(--padding);
  height: var(--height);
  min-width: var(--minWidth);
  line-height: var(--lineHeight);

  font-family: inherit;
  border: 2px solid transparent;

  &:focus {
    outline-color: var(--color-blue500);
    outline-offset: 4px;
  }
`

const DefaultButton = styled(ButtonBase)`
  color: var(--color-gray800);
  background-color: var(--color-gray50);
  border: 1px solid var(--color-gray100);
  &:hover {
    background-color: var(--color-gray100);
    color: var(--color-gray800);
    border-color: var(--color-gray800);
  }
`
const PrimaryButton = styled(ButtonBase)`
  color: var(--color-textWhite);
  background-color: var(--color-text);
  border: 1px solid var(--color-text);
  &:hover {
    background-color: var(--color-text);
    color: #000;
    background-color: #fff;
    border-color: #000;
  }
`
const SecondaryButton = styled(ButtonBase)`
  color: var(--color-textWhite);
  background-color: var(--color-blue500);
  border: 1px solid var(--color-blue700);
  &:hover {
    background-color: var(--color-blue700);
    color: var(--color-white);
    border-color: var(--color-blue700);
  }
`

const OutlineButton = styled(ButtonBase)`
  color: var(--color-gray600);
  background-color: var(--color-background);
  border: 1px solid var(--color-gray300);
  &:hover {
    color: var(--color-text);
    background-color: var(--color-background);
    border: 1px solid var(--color-text);
  }
`

const InvisibleButton = styled(ButtonBase)`
  color: ${COLORS.gray500};
  background-color: transparent;
  outline-color: ${COLORS.gray500};

  &:hover {
    background: ${COLORS.transparentGray15};
    color: ${COLORS.black};
  }
`

export default Button
