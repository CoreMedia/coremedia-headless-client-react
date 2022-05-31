import React, { FC } from "react";
import styled from "styled-components";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import StaticCode from "../StaticCode/StaticCode";
import { Navigation } from "../../models/Navigation/Navigation";
import FooterItem from "./FooterItem";

export const StyledColumn = styled.div`
  font-size: var(--font-size-text);
  list-style: none;
  padding: 0;
  margin: var(--padding-small) 0;

  @media screen and (min-width: 768px) {
    margin: var(--padding-medium) 0;
  }
  h2 {
    margin-top: 25px;
    margin-bottom: 0;
    padding-left: 12px;
    border-left: 4px solid var(--color-background-dark);
    font-size: var(--font-size-heading-2);
    color: var(--color-background-dark);
  }

  > li {
    margin-top: 13px;

    a {
      color: var(--color-background-dark);
      text-decoration: none;
      :hover {
        text-decoration: underline;
      }
    }
  }
`;
const FooterNavigationColumn: FC<Navigation> = ({
  title,
  code,
  items,
  linkTarget,
  openInNewTab,
  externalLink,
  metadata,
}) => {
  if (code) {
    return (
      <StyledColumn {...metaDataElement(metadata?.root)}>
        {title && (
          <h2>
            <Link to={linkTarget} openInNewTab={openInNewTab} externalLink={externalLink}>
              {title}
            </Link>
          </h2>
        )}
        <StaticCode code={code} metadata={metadata} />
      </StyledColumn>
    );
  }
  return (
    <StyledColumn {...metaDataElement(metadata?.root)}>
      {title && (
        <h2>
          <Link to={linkTarget} openInNewTab={openInNewTab} externalLink={externalLink}>
            {title}
          </Link>
        </h2>
      )}
      {items && (
        <StyledColumn as={"ul"} {...metaDataProperty(metadata?.properties?.items)}>
          {items.map((item, index) => {
            return <FooterItem key={index} {...item} />;
          })}
        </StyledColumn>
      )}
    </StyledColumn>
  );
};

export default FooterNavigationColumn;
