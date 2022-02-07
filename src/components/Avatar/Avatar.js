import React from "react"
import PropTypes from "prop-types"
import styled, { css, keyframes } from "styled-components"

import { Icon } from "../Icon"
import { FONT_SIZES, COLORS } from "../../constants"

export const sizes = {
  jumbo: 260,
  xl: 56,
  large: 40,
  medium: 28,
  small: 20,
  xs: 16,
}

const glow = keyframes`
  0%, 100% { opacity: .9; }
  50% { opacity: .7; }
`

function initials(name) {
  const [firstName, lastName] = name.split(" ")
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0)
}

const Image = styled.div`
  background: ${props => (!props.loading ? "transparent" : "#000000")};
  border-radius: 50%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  text-transform: uppercase;

  height: ${sizes.medium}px;
  width: ${sizes.medium}px;
  line-height: ${sizes.medium}px;

  ${props =>
    props.size === "jumbo" &&
    css`
      height: ${sizes.jumbo}px;
      width: ${sizes.jumbo}px;
      line-height: ${sizes.jumbo}px;
      filter: drop-shadow(0px 0px 25px hsl(0deg 0% 0% / 0.3));
    `}
  ${props =>
    props.size === "xs" &&
    css`
      height: ${sizes.xs}px;
      width: ${sizes.xs}px;
      line-height: ${sizes.xs}px;
    `}

  ${props =>
    props.size === "small" &&
    css`
      height: ${sizes.small}px;
      width: ${sizes.small}px;
      line-height: ${sizes.small}px;
    `}

  ${props =>
    props.size === "large" &&
    css`
      height: ${sizes.large}px;
      width: ${sizes.large}px;
      line-height: ${sizes.large}px;
    `}

    ${props =>
    props.size === "xl" &&
    css`
      height: ${sizes.xl}px;
      width: ${sizes.xl}px;
      line-height: ${sizes.xl}px;
    `}

  ${props =>
    !props.src &&
    css`
      background: ${!props.loading && "#000000"};
    `}

  img {
    width: 100%;
    height: auto;
    display: block;
  }

  svg {
    position: relative;
    bottom: -5px;
    height: 100%;
    width: 100%;
    vertical-align: top;
  }

  path {
    fill: var(--color-gray300);
    animation: ${glow} 1.5s ease-in-out infinite;
  }
`

// prettier-ignore
const Initial = styled.div`
  color: var(--color-gray100);
  text-align: center;
  // variables won't work until we can get GlobalStyles to work
  /* font-family: var(--body-font); */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: ${FONT_SIZES[0]};
  line-height: ${sizes.medium}px;

  ${props => props.size === "xs" && css`
    font-size: 8px;
    line-height: ${sizes.xs}px;
  `}

  ${props => props.size === "small" && css`
    font-size: 10px;
    line-height: ${sizes.small}px;
  `}

  ${props => props.size === "large" && css`
    font-size: ${FONT_SIZES[2]};
    line-height: ${sizes.large}px;
  `}

  ${props => props.size === "xl" && css`
    font-size: ${FONT_SIZES[3]};
    line-height: ${sizes.xl}px;
  `}

  ${props => props.size === "jumbo" && css`
    font-size: ${FONT_SIZES[6]};
    line-height: ${sizes.jumbo}px;
  `}
`;

/**
- Use an avatar for attributing actions or content to specific users.
- The user's name should always be present when using Avatar – either printed beside the avatar or in a tooltip.
**/
const Avatar = ({ loading, username, src, size, ...props }) => {
  let avatarFigure = (
    <Icon id={`user`} size={32} width={32} strokeWidth={2} aria-hidden="true" />
  )
  const a11yProps = {}

  if (loading) {
    a11yProps["aria-busy"] = true
    a11yProps["aria-label"] = "Loading avatar ..."
  } else if (src) {
    avatarFigure = <img src={src} alt={username} />
  } else {
    a11yProps["aria-label"] = username
    avatarFigure = (
      <Initial size={size} aria-hidden="true">
        {/* {username.substring(0, 1)} */}
        {initials(username)}
      </Initial>
    )
  }

  return (
    <Image size={size} loading={loading} src={src} {...a11yProps} {...props}>
      {avatarFigure}
    </Image>
  )
}

Avatar.propTypes = {
  /**
    Use the loading state to indicate that the data Avatar needs is still loading.
    */
  loading: PropTypes.bool,
  /**
    Avatar falls back to the user's initial when no image is provided. 
    Supply a `username` and omit `src` to see what this looks like.
    */
  username: PropTypes.string,
  /**
    The URL of the Avatar's image.
    */
  src: PropTypes.string,
  /**
    Avatar comes in four sizes. In most cases, you'll be fine with `medium`.
    */
  size: PropTypes.oneOf(Object.keys(sizes)),
}

Avatar.defaultProps = {
  loading: false,
  username: "loading",
  src: null,
  size: "medium",
}

export default Avatar
