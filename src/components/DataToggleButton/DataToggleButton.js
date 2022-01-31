import styled from "styled-components"
import UnstyledButton from "../UnstyledButton"

import { QUERIES } from "../../constants"

export default styled(UnstyledButton)`
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  position: relative;
  appearance: none;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  z-index: 0;
  text-align: center;
  text-decoration: none;
  line-height: 38px;
  white-space: nowrap;

  min-width: 200px;
  height: 50px;
  padding: 0px 25px;
  border-radius: 5px;
  font-size: 1rem;
  flex-shrink: 0;
  margin: 0px;
  color: var(--color-textWhite);
  background-color: var(--color-textPrimary);
  border: 1px solid var(--color-textPrimary);
  transition: all 0.2s ease 0s;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  &:hover {
    color: #000;
    background-color: #fff;
    border-color: #000;
  }
  display: inline-flex;
  flex: 1;

  @media ${QUERIES.smAndUp} {
    display: inline-block;
    flex: 0;
  }
`
