import React from "react";
import PreviewMetadataProps, { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import "./Tags.scss";
import { Tag } from "../../models/Banner/Tag";

interface Props extends PreviewMetadataProps {
  tags: Array<Tag | null>;
}

const TagList: React.FC<Props> = ({ tags }) => {
  return (
    <>
      {tags && tags.length > 0 && (
        <div className={"cm-tag"}>
          <h3 className={`cm-tag__headline`}>Tags</h3>
          <ul className={`cm-tag__items`}>
            {tags.map((taxonomy, index) => {
              return (
                taxonomy && (
                  <li key={index} className={`cm-tag__item`} {...metaDataElement(taxonomy.metadata?.root)}>
                    {taxonomy.linkTarget && (
                      <Link to={taxonomy.linkTarget} {...metaDataProperty(taxonomy.metadata?.name)}>
                        {taxonomy.name}
                      </Link>
                    )}
                    {!taxonomy.linkTarget && taxonomy.name}
                  </li>
                )
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
export default TagList;
