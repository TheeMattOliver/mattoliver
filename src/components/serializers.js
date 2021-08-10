import React from "react";
import Figure from "./Figure";
import SyntaxHighlighter from "react-syntax-highlighter";

const serializers = {
  types: {
    /* eslint-disable-next-line react/display-name */
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    code: props => <SyntaxHighlighter language={props.node.language}>{props.node.code}</SyntaxHighlighter>
  },
};

export default serializers;
