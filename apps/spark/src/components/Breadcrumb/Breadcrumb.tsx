import React from "react";
import styled from "styled-components";
import Link from "../Link/Link";
import { useBreadcrumbContext } from "../../context/BreadcrumbContext";
import { initializeMetadata, metaDataElement } from "../../utils/Preview/MetaData";
import HomeIcon from "./assets/house.svg";

export const BreadcrumbItem = styled.div`
  display: inline-block;
`;

export const StyledBreadcrumb = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  justify-items: center;
  align-items: stretch;
  padding: 1em 0;
  width: var(--screen-size-max);
  max-width: 100%;
  color: var(--color-grey);
  font-size: var(--font-size-text-small);
  font-family: var(--font-family-text);
  margin-top: var(--padding-medium);
  gap: 0;
  border-top: 1px solid var(--color-light-grey);
  border-bottom: 1px solid var(--color-light-grey);

  ${BreadcrumbItem}:not(:last-child):after {
    content: ">";
    margin: 0 0.5em;
  }

  img {
    height: 1em;
    aspect-ratio: 1/1;
  }

  a {
    color: var(--color-grey);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Breadcrumb: React.FC = () => {
  const { navigationPath } = useBreadcrumbContext();
  if (!navigationPath || navigationPath.length < 2) {
    return null;
  }

  // Calculate breadcrumb items incl. link target
  const breadcrumbItems = navigationPath.map((item, index) => {
    return {
      title: item.title,
      linkTarget: item.segment
        ? "/" +
          navigationPath
            .slice(0, index + 1)
            .map((i) => i.segment)
            .join("/")
        : "",
      ...initializeMetadata(item.id),
    };
  });

  return (
    <StyledBreadcrumb>
      {breadcrumbItems.map((item, index) => {
        return (
          <BreadcrumbItem key={index} {...metaDataElement(item.metadata)}>
            <Link to={item.linkTarget}>
              <span>
                {index == 0 && <img src={HomeIcon} alt="Home" />}
                {index > 0 && item.title}
              </span>
            </Link>
          </BreadcrumbItem>
        );
      })}
    </StyledBreadcrumb>
  );
};

export default Breadcrumb;
