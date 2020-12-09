// @flow
import React from 'react';
import PropTypes from 'prop-types';
import HtmlToReact from 'html-to-react';

import { H1, H2, H3 } from './Heading';
import { P } from './Paragraph';
import { Wrapper, PictureWrapper } from './Wrapper';
import Picture from '../CMPicture';

type Props = {
  text: string,
  color?: string,
};

const Richtext = ({ text, color }: Props) => {
  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  const processingInstructions = [
    {
      shouldProcessNode: function(node) {
        return node.name === 'h1';
      },
      processNode: function(node, children, index) {
        return <H1 key={index}>{children}</H1>;
      },
    },
    {
      shouldProcessNode: function(node) {
        return node.name === 'h2';
      },
      processNode: function(node, children, index) {
        return <H2 key={index}>{children}</H2>;
      },
    },
    {
      shouldProcessNode: function(node) {
        return node.name === 'h3';
      },
      processNode: function(node, children, index) {
        return <H3 key={index}>{children}</H3>;
      },
    },
    {
      shouldProcessNode: function(node) {
        return node.name === 'p';
      },
      processNode: function(node, children, index) {
        return <P key={index}>{children}</P>;
      },
    },
    {
      shouldProcessNode: function(node) {
        return node.name === 'img';
      },
      processNode: function(node, children, index) {
        const src = node.attribs['cms-src'];
        const alt = node.attribs['alt'];
        return (
          <PictureWrapper key={index}>
            <Picture link={src} ratio="landscape_ratio16x9" alt={alt} stretch />
          </PictureWrapper>
        );
      },
    },
    {
      // handle all remaining nodes with default
      shouldProcessNode: function(node) {
        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ];

  const HtmlToReactParser = HtmlToReact.Parser;
  const htmlToReactParser = new HtmlToReactParser();
  const isValidNode = () => {
    return true;
  };
  const reactComponent = htmlToReactParser.parseWithInstructions(
    text,
    isValidNode,
    processingInstructions
  );
  return <Wrapper>{reactComponent}</Wrapper>;
};

Richtext.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Richtext;
