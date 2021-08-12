import React from "react";
import styled from "styled-components";
import Figure from "./Figure";
import EmbedHTML from './EmbedHTML';
import TwitterTweetEmbed from './TwitterTweetEmbed'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const serializers = {
  types: {
    /* eslint-disable-next-line react/display-name */
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    embedHTML: EmbedHTML,
    code: ({ node = {} }) => {
      const { code, language } = node;
      if (!code) return null;
      return (
        <SyntaxHighlighter language={language || 'text'} style={vscDarkPlus}>{code}</SyntaxHighlighter>
      )
    },
    // twitter: ({ node }) => `<div id="${node.id}" class="tweet"></div>`
    twitter: ({ node }) => <Tweet><TwitterTweetEmbed tweetId={node.id} options={{ conversation: "none" }} /></Tweet>
  },
  marks: {
    link: ({ children, mark }) =>
      mark.blank ? (
        <a href={mark.href}
          target="_blank"
          rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <a href={mark.href}>{children}</a>
      ),
    strong: (props) => <strong>{props.children}</strong>,
    em: (props) => <em>{props.children}</em>,
  }
};

export default serializers;

const Tweet = styled.div`
  padding: 1rem;
`;