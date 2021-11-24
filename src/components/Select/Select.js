import React from "react"
import styled from "styled-components"
import { QUERIES } from "../../constants"

import Icon from "../Icon"
import { getDisplayedValue } from "./Select.helpers"

const Select = ({ label, value, onChange, children }) => {
  const displayedValue = getDisplayedValue(value, children)

  return (
    <Wrapper>
      <NativeSelect value={value} onChange={onChange}>
        {children}
      </NativeSelect>

      <PresentationalBit>
        {displayedValue}
        <IconWrapper style={{ "--size": 24 + "px" }}>
          <Icon id="chevronDown" strokeWidth={1} size={24 + "px"} />
        </IconWrapper>
      </PresentationalBit>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  /* prevent line breaks with max-content*/
  width: max-content;
  @media ${QUERIES.smAndSmaller} {
    flex: 1;
  }
`

const NativeSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`

const PresentationalBit = styled.div`
  color: var(--color-textWhite);
  background-color: var(--color-panelBackgroundDark);
  border: 1px solid var(--color-textPrimary);
  font-size: ${16 / 16}rem;
  height: 50px;
  padding: 16px 16px;
  padding-right: 52px;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  border-radius: 5px;

  /* we need to set the focus ring bc we set the opacity to 0, so use the adjacent sibling combinator; 
  "if native select is focused then the current element (ampersand = placeholder for "current thing") 
  should receive these styles " 
  */
  ${NativeSelect}:focus + & {
    outline: 1px dotted #212121;
    outline: 5px auto -webkit-focus-ring-color;
  }
  ${NativeSelect}:hover + & {
    color: var(--color-textBlack);
    background-color: var(--color-gray100);
    border-color: var(--color-borderPrimary);
  }
`
const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 10px;
  margin: auto;
  width: var(--size);
  height: var(--size);
  /* to avoid having to use z-index, use this to ignore clicks on the caret to be able to use it*/
  pointer-events: none;
`

export default Select
