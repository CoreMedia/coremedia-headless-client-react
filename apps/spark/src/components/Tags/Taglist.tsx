import React from "react";
import styled from "styled-components";
import { metaDataElement, metaDataProperty, PreviewMetadata } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import { Tag } from "../../models/Banner/Tag";

interface Props extends PreviewMetadata {
  tags: Array<Tag | null>;
}

const Headline = styled.h3`
  font-family: var(--font-family-headline);
  font-size: var(--font-size-heading-2);
  text-align: center;
`;

const Items = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: block;
  text-align: center;
`;

const Item = styled.li`
  display: inline-block;
  padding: var(--padding-small) var(--padding-medium);
  background: var(--color-background-light);
  margin: var(--padding-small);
  margin-top: 0;
  border: 1px solid var(--color-background-dark);
  border-radius: 5px;

  > a {
    text-decoration: none;
  }

  :hover {
    background: var(--color-background-dark);
    color: var(--color-background-light);

    > a {
      color: var(--color-background-light);
    }
  }
`;

const TagList: React.FC<Props> = ({ tags }) => {
  return (
    <>
      {tags && tags.length > 0 && (
        <div>
          <Headline>Tags</Headline>
          <Items>
            {tags.map((taxonomy, index) => {
              return (
                taxonomy && (
                  <Item key={index} {...metaDataElement(taxonomy.metadata?.root)}>
                    {taxonomy.linkTarget && (
                      <Link to={taxonomy.linkTarget} {...metaDataProperty(taxonomy.metadata?.properties?.name)}>
                        {taxonomy.name}
                      </Link>
                    )}
                    {!taxonomy.linkTarget && taxonomy.name}
                  </Item>
                )
              );
            })}
          </Items>
        </div>
      )}
    </>
  );
};
export default TagList;
