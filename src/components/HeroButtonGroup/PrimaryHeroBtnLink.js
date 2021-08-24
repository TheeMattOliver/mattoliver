import styled from 'styled-components';
import { Link } from 'gatsby-plugin-intl'

const PrimaryHeroBtnLink = styled(Link)`
  flex: 1;
  appearance: none;
  position: relative;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  z-index: 0;
  text-align: center;
  text-decoration: none;
  line-height: 38px;
  white-space: nowrap;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
  
  &:hover {
    color: #000;
    background-color: #FFF;
    border-color: #000;
  }
`;

export default PrimaryHeroBtnLink