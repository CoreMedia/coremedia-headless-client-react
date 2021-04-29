import React from "react";
import { metaDataElement } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import Image from "../Media/Image";
import "./Person.scss";
import { Author } from "../../models/Banner/Author";

const PersonBlurb: React.FC<Author> = ({ displayName, text, picture, linkTarget, metadata = {} }) => {
  return (
    <div className={"cm-author"} {...metaDataElement(metadata.root)}>
      {picture && (
        <Link to={linkTarget} className={`cm-author__picture`}>
          <Image picture={picture} cropName={"portrait_ratio1x1"} width={200} />
        </Link>
      )}
      <div className={`cm-author__description`}>
        {displayName && (
          <Link to={linkTarget} className={`cm-author__link`}>
            <h3 className={`cm-author__headline`} {...metaDataElement(metadata.displayName)}>
              {displayName}
            </h3>
          </Link>
        )}
        {text && (
          <p
            className={`cm-author__short-text`}
            {...metaDataElement(metadata.text)}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
      </div>
    </div>
  );
};
export default PersonBlurb;
