import React from "react";
import styled from "styled-components";
import Link, { LinkAttributes } from "../Link/Link";
import { metaDataProperty, PreviewMetadata } from "../../utils/Preview/MetaData";

interface Props extends PreviewMetadata, LinkAttributes {
  title: string | null;
  plaintext: string | null;
}

export const Title = styled(Link)`
  text-decoration: none;
  font-family: var(--font-family-headline);
  &:hover {
    text-decoration: underline;
  }
`;
export const Headline = styled.h3`
  font-family: var(--font-family-headline);
  font-size: var(--font-size-heading-3);
  color: #000;
  margin: 0 0 15px;
`;
export const Text = styled.div`
  --max-lines: 5;
  color: #000;
  margin: 0 0 15px;
  flex-grow: 1; //align cta at bottom
  max-height: calc(var(--line-height) * var(--max-lines));
  overflow: hidden;
  line-height: var(--line-height);
`;

const BannerCaption: React.FC<Props> = ({
  title,
  plaintext,
  linkTarget,
  openInNewTab,
  externalLink,
  metadata = {},
}) => {
  return (
    <>
      {title && (
        <Title to={linkTarget || ""} openInNewTab={openInNewTab} externalLink={externalLink}>
          <Headline {...metaDataProperty(metadata.properties?.title)}>{title}</Headline>
        </Title>
      )}
      {plaintext && (
        <Text dangerouslySetInnerHTML={{ __html: plaintext }} {...metaDataProperty(metadata.properties?.plaintext)} />
      )}
    </>
  );
};

export default BannerCaption;
