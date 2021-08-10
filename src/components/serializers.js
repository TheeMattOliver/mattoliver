import React from "react";
import Figure from "./Figure";
import EmbedHTML from './EmbedHTML';
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
    }
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
      )
  }
};

export default serializers;
