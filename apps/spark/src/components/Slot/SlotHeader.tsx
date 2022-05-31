import React from "react";
import styled from "styled-components";
import { metaDataProperty, PreviewMetadata } from "../../utils/Preview/MetaData";

interface Props extends PreviewMetadata {
  title?: string;
  text?: string;
}

const Headline = styled.h2`
  font-family: var(--font-family-headline);
  font-size: var(--font-size-heading-1);
  text-align: center;
  line-height: 1;
  margin-top: var(--padding-medium);
  margin-bottom: var(--padding-medium);
`;

const Text = styled.div``;

const SlotHeader: React.FC<Props> = ({ title, text, metadata }) => {
  return (
    <>
      {title && <Headline {...metaDataProperty(metadata?.properties?.title)}>{title}</Headline>}
      {text && <Text {...metaDataProperty(metadata?.properties?.text)} dangerouslySetInnerHTML={{ __html: text }} />}
    </>
  );
};

export default SlotHeader;
