import React from 'react';
import styled from 'styled-components';

import { throttle } from '../../lib/utils'

const TableOfContents = ({ content }) => {
  // make an array of headings and their id's
  const headingsWithIds = content.slice(1).map((item) => ({
    heading: item.heading,
    id: item.anchor,
  }));

  const activeHeadingId = useActiveHeading(headingsWithIds);

  return (
    <Wrapper>
      <ol>
        {/* remove the lede */}
        {content.slice(1).map(item => {
          return (
            <ContentLinkHeading
              key={item._key}
              style={getStyles(
                activeHeadingId === item.anchor
              )}
            >
              <a href={`#${item.anchor}`}>
                {item.heading}
              </a>
            </ContentLinkHeading>
          )
        })}
      </ol>
    </Wrapper>
  )
}

const useActiveHeading = (headings) => {
  const [activeHeadingId, setActiveHeading] = React.useState(null);

  React.useEffect(() => {
    const handleScroll = throttle(() => {

      if (window.pageYOffset === 0) {
        return setActiveHeading(null);
      }

      // 1. Are there any headings in the viewport right now? If so, pick the
      //    top one.
      // 2. If there are no headings in the viewport, are there any above
      //    the viewport? If so, pick the last one (most recently scrolled out
      //    of view)
      //

      // If neither condition is met, we're still in the intro,
      let headingBoxes = headings.map((heading) => {
        const elem = document.querySelector(`#${heading.id}`)
        return { id: heading.id, box: elem.getBoundingClientRect() }
      })
      
      // The first heading within the viewport is the one we want to highlight.
      const TOP_OFFSET = 120;
      let firstHeadingInViewport = headingBoxes.find(({ box }) => {
        return (
          box.bottom > TOP_OFFSET && box.top < window.innerHeight
        );
      });

      // If there is no heading in the viewport, check and see if there are any
      // above the viewport.
      if (!firstHeadingInViewport) {
        const reversedBoxes = [...headingBoxes].reverse();

        firstHeadingInViewport = reversedBoxes.find(({ box }) => {
          return box.bottom < TOP_OFFSET;
        });
      }

      if (!firstHeadingInViewport) {
        setActiveHeading(null);
      } else if (firstHeadingInViewport.id !== activeHeadingId) {
        setActiveHeading(firstHeadingInViewport.id);
      }

    }, 350);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeHeadingId, headings]);

  return activeHeadingId;
};

const getStyles = (isActiveHeading) => {
  const baseStyles = {
    color: isActiveHeading ? 'var(--color-textPrimary)' : undefined,
    background: isActiveHeading ? 'var(--color-gray300)' : undefined
  };
  return {
    ...baseStyles,
    marginTop: 10,
    fontSize: 16,
    padding: 16,
    borderRadius: 4
  };
};

const Wrapper = styled.nav`
  margin-bottom: 4rem;
`;

const ContentLinkHeading = styled.li`
  display: block;
  opacity: 0.7;
  color: var(--color-gray800);
  text-decoration: none;
  transition: opacity 500ms, background-color 200ms ease 0s;

  &:hover,
  &:focus {
    opacity: 1;
    transition: opacity 0ms;
  }
`;

export default TableOfContents
