import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Related from "./DetailedRelated";
import PersonWithInfo from "../Person/PersonWithInfo";
import RichText from "../RichText/RichText";
import { DetailAuthor } from "../../models/Detail/DetailAuthor";

const DetailedPerson: React.FC<DetailAuthor> = ({
  structuredText,
  picture,
  displayName,
  jobTitle,
  organization,
  eMail,
  related,
  metadata = {},
}) => {
  return (
    <div className={`cm-details cm-details--person`} {...metaDataElement(metadata.root)}>
      <article className={`cm-details__content`}>
        <PersonWithInfo
          picture={picture}
          displayName={displayName}
          jobTitle={jobTitle}
          organization={organization}
          eMail={eMail}
          cssClass={"cm-details"}
        />
        {structuredText && (
          <div className={`cm-details__text`} {...metaDataProperty(metadata.properties?.structuredText)}>
            <RichText text={structuredText} />
          </div>
        )}
      </article>
      {related && (
        <section className={`cm-details__related`} {...metaDataProperty(metadata.properties?.related)}>
          <Related related={related} />
        </section>
      )}
    </div>
  );
};
export default DetailedPerson;
